const { Command } = require("discord-akairo");

class PrefixCommand extends Command {
  constructor() {
    super("prefix", {
      aliases: ["prefix"],
      ownerOnly: true,
      category: "admin",
      args: [
        {
          id: "prefix",
          default: "!"
        }
      ],
      channelRestriction: "guild"
    });
  }

  exec(message, args) {
    // The third param is the default.
    const oldPrefix = this.client.settings.get(message.guild.id, "prefix", "!");

    return this.client.settings
      .set(message.guild.id, "prefix", args.prefix)
      .then(() => {
        return message.reply(
          `Prefix changed from ${oldPrefix} to ${args.prefix}`
        );
      })
      .catch(error => console.error(error));
  }
}

module.exports = PrefixCommand;
