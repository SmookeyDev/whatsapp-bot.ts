import Jimp from "jimp";
import { base64Text } from "./editImage";

export const produceImageFromText = async (text: string) => {
  const dimension = 600;

  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const image = await Jimp.read(dimension, dimension, "black");

  image.print(
    font,
    0,
    0,
    { text, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE },
    dimension,
    dimension
  );

  const asBase64 = await image.getBase64Async(Jimp.MIME_PNG);
  return asBase64.replace(base64Text, "");
};
