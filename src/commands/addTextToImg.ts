import Jimp from "jimp";

export default async function addTextToImg(
  img: string,
  text: string
): Promise<string> {
  const base64Text = "data:image/png;base64,";
  if (img.includes(base64Text)) img = img.replace(base64Text, "");
  const image = await Jimp.read(Buffer.from(img, "base64"));
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const x = image.getWidth();
  const y = image.getHeight();
  const alignMagicNumber = 0.7;
  await image.writeAsync("temp.png");
  const tempFile = await Jimp.read("temp.png");
  tempFile.resize(x * alignMagicNumber, Jimp.AUTO);
  tempFile.print(font, x * alignMagicNumber, y * alignMagicNumber, text);

  const r = await tempFile.getBase64Async(Jimp.MIME_PNG);
  return r.replace(base64Text, "");
}
