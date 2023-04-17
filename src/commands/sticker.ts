import { Message, MessageMedia } from "whatsapp-web.js";
import { Command } from "../types/command";
import { findMessageWithMedia } from "../helpers/find-media-recursive";
import { addTextToImage } from "../lib/editImage";
import client from "../helpers/client";

module.exports = class Sticker extends Command {
  constructor() {
    super({
      name: "sticker",
      description: "Converts an image to a sticker",
      usage: "sticker",
    });
  }

  public async execute(msg: Message): Promise<any> {
    const text = msg.body.slice(this.options.name.length).trim();
    const args = text.split(" ");

    try {
      const message = await findMessageWithMedia(msg);
      if (!message)
        return msg.reply("Não foi possível encontrar uma mídia para converter em sticker");
      const media = await message.downloadMedia();
      const mediaData = media.data;

      const shouldAddText = text && text.length > 0 && args.length > 0;
      const mediaWithText = shouldAddText ? await addTextToImage(mediaData, text) : mediaData;

      const sticker = new MessageMedia(media.mimetype, mediaWithText, media.filename);
      await client.sendMessage(msg.from, sticker, { sendMediaAsSticker: true });
    } catch (err) {
      msg.reply("Erro ao converter a mídia em sticker");
      console.log(`[ERROR] ${err}`);
    }
  }
}