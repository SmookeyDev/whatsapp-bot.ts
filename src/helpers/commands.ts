import path from "path";
import { Command } from "../types/command";
import { Message } from "whatsapp-web.js";

export class Commands {
  public static initialized = false;
  private static instance: Commands;
  private static commands: { [key: string]: Command } = {};

  constructor() {
    this.loadCommands();
  }

  public static getInstance() {
    if (!Commands.initialized) {
      Commands.instance = new Commands();
      Commands.initialized = true;
    }
    return Commands.instance;
  }

  public loadCommands() {
    const files = require("fs").readdirSync(path.join(__dirname, "..", "commands"));
    // console.log(files);
    files.forEach((file: any) => {
      import(`../commands/${file}`).then((command) => {
        if (command.default instanceof Function) {
          const commandInstance = new command.default();
          Commands.commands[commandInstance.options.name] = commandInstance;
          console.log(`[COMMAND] ${commandInstance.options.name} loaded!`);
        }
      });
    });
  }

  public removeCommand(command: string) {
    delete Commands.commands[command];
  }

  public getCommands() {
    return Commands.commands;
  }

  public commandExists(command: string) {
    return !!Commands.commands[command];
  }

  public async handleCommand(msg: Message) {
    if (msg.body.startsWith("!")) {
      const command = msg.body.split(" ")[0].replace("!", "");

      if (this.commandExists(command)) {
        let chat = await msg.getChat();
        let name = await msg.getContact();

        console.log(`[COMMAND] ${name.pushname} used !${command} command in ${chat.name}`);

        Commands.commands[command].execute(msg);
      }
    }
  }
}