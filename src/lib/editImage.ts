import Jimp from "jimp";
import path from "path";

const text2SVG = require("text-svg");
const { convert } = require("convert-svg-to-png");

const base64Text = "data:image/png;base64,";

const getText = (text: string, width: number, height: number) => {
  const stepText = text
    .split(" ")
    .map((t) => {
      return { legnth: t.length, text: t };
    })
    .reduce(
      (finalText, t) => {
        finalText.trailer += t.legnth;

        if (finalText.trailer >= 20) {
          finalText.trailer = finalText.trailer % 20;
          finalText.value += `\n${t.text}`;
          return finalText;
        }

        finalText.value += ` ${t.text}`;

        return finalText;
      },
      { trailer: 0, value: "" }
    )
    ["value"].trim();

  const processedText = stepText.includes("\n")
    ? stepText
    : stepText.padStart((40 - stepText.length) / 2 + stepText.length).padEnd(40);

  console.log((20 - stepText.length) / 2);
  console.log(processedText);

  const s = text2SVG(processedText, {
    color: "white",
    strokeColor: "black",
    strokeWidth: "1",
    font: "regular 40px Impact",
    textAlign: "center",
    localFontPath: path.resolve(__dirname, "../unicode.impact.ttf"),
    localFontName: "Impact Regular",
  });
  return convert(s, { width });
};

const calcResizingDimensions = (x: number, y: number) => {
  const baseDimension = 700;

  if (x < y) {
    const newY = baseDimension;
    const newX = (x / y) * newY;
    return [newX, newY];
  } else {
    const newX = baseDimension;
    const newY = (y / x) * newX;
    return [newX, newY];
  }
};

const setup = async (img: string) => {
  if (img.includes(base64Text)) img = img.replace(base64Text, "");
  const image = await Jimp.read(Buffer.from(img, "base64"));
  const x = image.getWidth();
  const y = image.getHeight();
  await image.writeAsync("temp.png");
  const tempFile = await Jimp.read("temp.png");
  const [newX, newY] = calcResizingDimensions(x, y);

  return {
    x: newX,
    y: newY,
    tempFile,
  };
};

export async function addTextToImage(
  img: string,
  text: string,
  isWatermark = false
): Promise<string> {
  const { x, y, tempFile } = await setup(img);

  const txt = await getText(text, x, y);
  const textImg = await Jimp.read(txt);

  tempFile.resize(x, y).composite(textImg, 0, y - textImg.getHeight(), {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: isWatermark ? 0.5 : 1,
  });

  const r = await tempFile.getBase64Async(Jimp.MIME_PNG);
  return r.replace(base64Text, "");
}
