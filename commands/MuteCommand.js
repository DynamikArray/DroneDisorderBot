const { Command } = require("discord-akairo");
const { userPerms } = require("./userPerms.js");

module.exports = class MuteCommand extends Command {
  constructor() {
    super("mute", {
      aliases: ["mute"],
      category: "admin",
      channelRestriction: "guild",
      clientPermissions: ["MUTE_MEMBERS"],
      args: [
        {
          id: "muteUser",
          type: "memberMention",
          description: "Mention a user to Server Mute them.",
          prompt: "Please @mention a user"
        },
        {
          id: "duration",
          type: "number",
          description: "How long to mute user in seconds",
          prompt: "Please enter a duration.",
          default: 60000
        }
      ]
    });
  }

  userPermissions(message) {
    return userPerms(message);
  }

  exec(message, args) {
    const user2Mute = message.guild.member(args.muteUser);
    const muteTimeout = args.duration || 60;

    return user2Mute
      .setMute(true, "It needed to be done.")
      .then(res => {
        message
          .reply(
            `:mute: ${
              user2Mute.user
            } has been muted for ${muteTimeout} seconds!`
          )
          .then(msg => {
            setTimeout(msg => {
              user2Mute.setMute(false, "Timeout ended").then(res => {
                message.reply(`:mute: ${user2Mute.user} has been unmuted!`);
              });
            }, muteTimeout * 1000);
          });
      })
      .catch(err => message.reply(`ERROR: ${err.message}`));
  }
};

//module.exports = MuteCommand;
