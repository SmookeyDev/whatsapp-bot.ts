import { MessageMedia } from "whatsapp-web.js";
import client from "../helpers/client";

client.on('message', async (msg) => {
    if (msg.body.startsWith("!sticker")) {
        let chat = await msg.getChat();
        let name = await msg.getContact();

        console.log(`[COMMAND] ${name.pushname} used !sticker command in ${chat.name}`);

        try {

            let media = await msg.downloadMedia();
            let mediaData = await media.data;
            let mediaType = await media.mimetype;

            let sticker = new MessageMedia(mediaType, mediaData, media.filename);
            client.sendMessage(msg.from, sticker, { sendMediaAsSticker: true });
        }
        catch (err) {
            msg.reply("Erro ao converter a mídia em sticker");

            console.log(`[ERROR] ${err}`);
        }
    }

    if (msg.body.startsWith("!help")) {
        let name = await msg.getContact();

        console.log(`[COMMAND] ${name.pushname} used !help command`);

        msg.reply(`Comandos disponíveis:
            
!sticker - Converte a mídia em sticker, para isso você deve enviar uma mídia e usar o comando como legenda.
!help - Mostra os comandos disponíveis`)
    }

});