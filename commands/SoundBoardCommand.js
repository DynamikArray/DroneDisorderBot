const { Command } = require("discord-akairo");
const { userPerms } = require("./userPerms.js");

const { player } = require("../sounds/player.js");
const soundsList = require("../sounds");

class SoundBoardCommand extends Command {
  constructor() {
    super("sb", {
      aliases: ["sb"],
      category: "admin",
      cooldown: 10000,
      ratelimit: 2,
      args: [
        {
          id: "sound",
          type: "uppercase",
          description: "Choose a sound",
          prompt: {
            start:
              "Enter the sound name eg.***it*** or ***help*** for more information.",
            retry: "That's not a valid option! Try again."
          }
        }
      ]
    });

    this.soundFiles = soundsList.reduce((obj, item) => {
      obj[item.label.toUpperCase()] = item;
      return obj;
    }, {});

    this.helpMessage = soundsList.reduce((obj, item) => {
      obj = `${obj} \n **${item.label}** - ${item.description} `;
      return obj;
    }, "Current List of commands: \n");
  }

  createMessagePrompt(message) {
    return this.client.util.embed({
      color: 2785755,
      title: "Drone Disorder SoundBoard Commands",
      description:
        "Type the **Name** of the clip to play. eg (420 or Fail)  Alternately you can just include the name in your command eg, ~sb 420.",
      fields: this.createMessageFields(message),
      timestamp: new Date(),
      footer: {
        text: "Drone Disorder 2018 | DynamikArray "
      }
    });
  }

  createSoundField(sound) {
    return {
      name: `**${sound.label}**`,
      value: `*${sound.description}*`,
      inline: true
    };
  }

  createMessageFields(message) {
    return soundsList.map(sound => this.createSoundField(sound));
  }

  userPermissions(message) {
    //CUSTOM SET OF PERMS JUST FOR THIS COMMAND
    const roles = ["Admin", "Moderator", "Voice Moderator", "DDBot"];
    const objRoles = message.member.roles;

    if (objRoles.some(role => roles.includes(role.name))) {
      return true;
    }

    return false;
  }

  exec(message, args) {
    //Fix for prefix being included on arguments
    const alias = this.aliases[0].toUpperCase();
    const soundCmd = args.sound.replace(`~${alias} `, "");

    //IF Help do something?
    if (soundCmd.toUpperCase() === "HELP") {
      return message.author.send(this.helpMessage);
    }

    const sounds = this.soundFiles;
    if (soundCmd && sounds) {
      const sound = sounds[soundCmd];
      if (sound) return player(message, sound.file);
    }

    return false;
  }
}

module.exports = SoundBoardCommand;
