import Jimp from "jimp";

const base64Text = "data:image/png;base64,";

const setup = async (img: string) => {
  if (img.includes(base64Text)) img = img.replace(base64Text, "");
  const image = await Jimp.read(Buffer.from(img, "base64"));
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const x = image.getWidth();
  const y = image.getHeight();
  await image.writeAsync("temp.png");
  const tempFile = await Jimp.read("temp.png");

  return {
    x,
    y,
    font,
    tempFile,
  };
};

export async function addTextToImg(
  img: string,
  text: string,
  isWatermark = false
): Promise<string> {
  const { x, y, font, tempFile } = await setup(img);
  const markImg = (image: Jimp) =>
    isWatermark
      ? image.print(font, 0, 0, text)
      : image.print(
          font,
          image.bitmap.width / 2 - 10,
          image.bitmap.height / 2,
          text
        );
  const imgText: Jimp = await new Promise(
    (resolve, reject) =>
      new Jimp(x, y, "#00000000", (err, image) => {
        markImg(image);
        if (err) reject(err);
        else resolve(image);
      })
  );

  tempFile.composite(imgText, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource:  isWatermark ? 0.5 : 1,
  });

  const r = await tempFile.getBase64Async(Jimp.MIME_PNG);
  return r.replace(base64Text, "");
}
