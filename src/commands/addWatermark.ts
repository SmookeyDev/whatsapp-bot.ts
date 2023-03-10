import Jimp from "jimp";

export async function addWatermark(img: string, text: string): Promise<string> {
  const base64Text = "data:image/png;base64,";
  if (img.includes(base64Text)) img = img.replace(base64Text, "");
  const image = await Jimp.read(Buffer.from(img, "base64"));
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const x = image.getWidth();
  const y = image.getHeight();
  const alignMagicNumber = 0.7;
  await image.writeAsync("temp.png");
  const tempFile = await Jimp.read("temp.png");

  const watermark: Jimp = await new Promise(
    (resolve, reject) =>
      new Jimp(x, y, "#00000000", (err, image) => {
        // left-top
        image.print(font, 0, 0, text);
        if (err) reject(err);
        else resolve(image);
      })
  );

  tempFile.composite(watermark, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: 0.5,
  });

  const r = await tempFile.getBase64Async(Jimp.MIME_PNG);
  return r.replace(base64Text, "");
}
