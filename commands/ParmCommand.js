const parmChannelId = "525905681405050892";
const { Command } = require("discord-akairo");

class ParmCommand extends Command {
  constructor() {
    super("parm", {
      aliases: ["parm"],
      category: "meme",
      cooldown: 10000,
      ratelimit: 3
    });
  }

  exec(message, args) {
    const parm = this.client.channels.get(parmChannelId);

    parm.fetchMessages({ limit: 100 }).then(messages => {
      const msg = messages.random();
      const attachment = msg.attachments.random();

      if (!attachment) return false;
      if (!attachment.url) return false;

      return message.reply(`${attachment.url}`);
    });
  }
}

module.exports = ParmCommand;
