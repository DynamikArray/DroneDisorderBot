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
      parm
        .fetchMessages({ limit: 100, before: messages.lastKey() })
        .then(msgs => {
          const manyMessages = messages.concat(msgs);
          const msg = manyMessages.random();
          //
          const author = msg.author.username;
          const thumbnail = msg.author.avatarURL;
          const attachment = msg.attachments.random();

          //
          if (!attachment) return false;
          if (!attachment.url) return false;

          return message.channel.send(
            this.client.util.embed({
              color: 0x82ad64,
              title: "Enjoy the tasty memes!",
              thumbnail: {
                url: `${thumbnail}`
              },
              description: `Posted By: ${author} `,
              image: {
                url: `${attachment.url}`
              },
              timestamp: new Date(),
              footer: {
                text: "Drone Disorder 2018 | DynamikArray "
              }
            })
          );
        });
    });

    /*
    parm.fetchMessages({ limit: 100 }).then(messages => {
      const msg = messages.random();
      const attachment = msg.attachments.random();

      if (!attachment) return false;
      if (!attachment.url) return false;

      return message.reply(`${attachment.url}`);
    });
    */
  }
}

module.exports = ParmCommand;
