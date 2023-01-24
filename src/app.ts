import client from './helpers/client';
import qrcode from 'qrcode-terminal';
import './commands';

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('Client is authenticated!');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    let chat = await msg.getChat();
    let name = await msg.getContact();

    if (msg.body) {
        if (chat.isGroup)
            console.log(`[GROUP MSG] ${chat.name} - ${name.pushname}: ${msg.body}`);
        else
            console.log(`[PRIVATE MSG] ${name.pushname}: ${msg.body}`);
    }
})

client.initialize();