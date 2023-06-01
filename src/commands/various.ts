import { MessageMedia } from "whatsapp-web.js";
import client from "../helpers/client";
import { addTextToImage } from "../lib/editImage";
import { findMessageWithMedia } from "../helpers/find-media-recursive";
import { produceImageFromText } from "../lib/produceImageFromText";

client.on("message", async (msg) => {
  let chat = await msg.getChat();
  let name = await msg.getContact();

  if (msg.body.startsWith("!sticker")) {
    console.log(`[COMMAND] ${name.pushname} used !sticker command in ${chat.name}`);
    const text = msg.body.slice("!sticker".length).trim();

    try {
      const message = await findMessageWithMedia(msg);
      if (!message)
        return msg.reply("Não foi possível encontrar uma mídia para converter em sticker");
      const media = await message.downloadMedia();
      const mediaData = media.data;

      const shouldAddText = text && text.length > 0 && msg.body.trim() !== "!sticker";
      const mediaWithText = shouldAddText ? await addTextToImage(mediaData, text) : mediaData;

      const sticker = new MessageMedia(media.mimetype, mediaWithText, media.filename);
      await client.sendMessage(msg.from, sticker, {
        sendMediaAsSticker: true,
        quotedMessageId: msg.id._serialized,
        stickerName: text,
        stickerAuthor: "https://github.com/SmookeyDev/whatsapp-bot.ts",
      });
    } catch (err) {
      msg.reply("Erro ao converter a mídia em sticker");
      console.log(`[ERROR] ${err}`);
    }
  }

  if (msg.body.startsWith("!singleview")) {
    console.log(`[COMMAND] ${name.pushname} used !singleview command in ${chat.name}`);

    try {
      const messageWithMedia = await findMessageWithMedia(msg);
      if (!messageWithMedia) return msg.reply("Não foi possível encontrar uma mídia para enviar");

      const media = await messageWithMedia.downloadMedia();
      const mediaData = media.data;

      const mediaMessage = new MessageMedia(media.mimetype, mediaData, media.filename);
      await client.sendMessage(msg.from, mediaMessage, { quotedMessageId: msg.id._serialized });
    } catch (err) {
      msg.reply("Erro ao enviar a mídia");
      console.log(`[ERROR] ${err}`);
    }
  }

  const textStickerCommand = "!text-sticker";

  if (msg.body.startsWith(textStickerCommand)) {
    console.log(`[COMMAND] ${name.pushname} used !text-sticker command in ${chat.name}`);

    try {
      const replyText = await msg.getQuotedMessage();

      const text = replyText
        ? replyText.body
        : msg.body.substring(textStickerCommand.length + 1).trim();

      if (text.length < 1) throw new Error("Texto enviado não tem nenhum caracter");

      const img = await produceImageFromText(text);

      const mediaMessage = new MessageMedia("image/png", img, "sticker text");
      await client.sendMessage(msg.from, mediaMessage, {
        quotedMessageId: msg.id._serialized,
        sendMediaAsSticker: true,
        stickerName: "sticker com texto",
        stickerAuthor: "https://github.com/SmookeyDev/whatsapp-bot.ts",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        msg.reply(err.message);
        console.log(`[ERROR] ${err}`);
      }
    }
  }

  if (msg.body.startsWith("!help")) {
    console.log(`[COMMAND] ${name.pushname} used !help command`);

    msg.reply(`Comandos disponíveis:

!sticker - Converte a mídia em sticker.
!singleview - Envia a midia de visualização única.
!help - Mostra os comandos disponíveis.`);
  }

  if (msg.body.startsWith("!singleview")) {
    try {
      const messageWithMedia = await findMessageWithMedia(msg);
      if (!messageWithMedia) return msg.reply("Não foi possível encontrar uma mídia para enviar");

      const media = await messageWithMedia.downloadMedia();
      const mediaData = media.data;

      const mediaMessage = new MessageMedia(media.mimetype, mediaData, media.filename);
      await client.sendMessage(msg.from, mediaMessage, { quotedMessageId: msg.id._serialized });
    } catch (err) {
      msg.reply("Erro ao enviar a mídia");
      console.log(`[ERROR] ${err}`);
    }
  }
});
