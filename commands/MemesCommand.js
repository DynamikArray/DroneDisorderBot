const { Command } = require("discord-akairo");

class MemesCommand extends Command {
  constructor() {
    super("memes", {
      aliases: ["memes"],
      channelRestriction: "guild",
      args: [
        {
          id: "memeID",
          type: "string",
          description: "Enter the meme to generate",
          prompt:
            "Please supply a valid meme template as the first argument of the command."
        }
      ]
    });
  }

  exec(message, args) {
    console.log(message);
  }
}

module.exports = MemesCommand;
