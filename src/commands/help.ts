import { Message } from "whatsapp-web.js";
import { Command } from "../types/command";
import { Commands } from "../helpers/commands";

module.exports = class Help extends Command {
  constructor() {
    super({
      name: "help",
      description: "Lista os comandos do bot",
      usage: "help",
    });
  }

  public async execute(msg: Message): Promise<any> {
    const commands = Commands.getInstance().getCommands();
    let text: string = "Comandos disponíveis:\n\n";
    const commandsList = Object.keys(commands).map((command) => {
      const commandInstance = commands[command];
      return text += `!${commandInstance.options.name} - ${commandInstance.options.description}\n`;
    });

    msg.reply(text);
  }
}