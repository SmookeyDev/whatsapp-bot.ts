import { Client, LocalAuth } from "whatsapp-web.js";

const client = new Client({
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
  puppeteer: {
    headless: true,
  },
  ffmpegPath: "files/ffmpeg",
});

export default client;
