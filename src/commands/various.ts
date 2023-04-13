import { MessageMedia } from "whatsapp-web.js";
import client from "../helpers/client";
import { addTextToImage } from "../lib/editImage";

client.on("message", async (msg) => {
  if (msg.body.startsWith("!sticker")) {
    let chat = await msg.getChat();
    let name = await msg.getContact();

    console.log(`[COMMAND] ${name.pushname} used !sticker command in ${chat.name}`);
    const text = msg.body.slice("!sticker".length).trim();
    const quotedMessage = await msg.getQuotedMessage()

    try {
      const message = quotedMessage?.hasMedia ? quotedMessage : msg;
      const media = await message.downloadMedia();
      const mediaData = media.data;
      
      const shouldAddText = text && text.length > 0 && msg.body.trim() !== "!sticker";
      const mediaWithText = shouldAddText ? await addTextToImage(mediaData, text) : mediaData;
    
      const sticker = new MessageMedia(media.mimetype, mediaWithText, media.filename);
      await client.sendMessage(msg.from, sticker, { sendMediaAsSticker: true });
    } catch (err) {
      msg.reply("Erro ao converter a mídia em sticker");
      console.log(`[ERROR] ${err}`);
    }
  }

  if (msg.body.startsWith("!help")) {
    let name = await msg.getContact();

    console.log(`[COMMAND] ${name.pushname} used !help command`);

    msg.reply(`Comandos disponíveis:

!sticker - Converte a mídia em sticker, para isso você deve enviar uma mídia e usar o comando como legenda.
!help - Mostra os comandos disponíveis`);
  }
});
