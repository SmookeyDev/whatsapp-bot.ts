import WAWebJS from "whatsapp-web.js";

export abstract class Command {
  public options = {
    name: "",
    description: "",
    usage: ""
  };

  constructor(options: {
    name: string,
    description: string,
    usage: string
  }) {
    this.options = options;
  }

  // public setOptions(options: { name: string, description: string, usage: string }) {
  //   this.options = options;
  // }

  abstract execute(msg: WAWebJS.Message): any;
}