const { Command } = require("discord-akairo");
const { userPerms } = require("./userPerms.js");

const { player } = require("../sounds/player.js");
const soundsList = require("../sounds");

class SoundBoardCommand extends Command {
  constructor() {
    super("sb", {
      aliases: ["sb"],
      category: "admin",
      args: [
        {
          id: "sound",
          type: "uppercase",
          description: "Choose a sound",
          prompt: {
            start: message => {
              return this.createMessagePrompt(message);
            },
            retry: "That's not a valid option! Try again."
          }
        }
      ]
    });

    this.soundFiles = soundsList.reduce((obj, item) => {
      obj[item.label.toUpperCase()] = item;
      return obj;
    }, {});
  }

  createMessagePrompt(message) {
    return this.client.util.embed({
      color: 2785755,
      title: "Drone Disord SoundBoard Command",
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
    return userPerms(message);
  }

  exec(message, args) {
    //Fix for prefix being included on arguments
    const alias = this.aliases[0].toUpperCase();
    const soundCmd = args.sound.replace(`~${alias} `, "");

    const sounds = this.soundFiles;
    if (soundCmd && sounds) {
      const sound = sounds[soundCmd];
      if (sound) return player(message, sound.file);
    }

    return false;
  }
}

module.exports = SoundBoardCommand;
