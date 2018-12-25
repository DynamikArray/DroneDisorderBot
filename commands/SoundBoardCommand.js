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
        "Select a clip from below by typing the name of the clip to play.  Alternatally you can just include the name in your command.",
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
    const soundCmd = args.sound;
    const sounds = this.soundFiles;

    if (soundCmd && sounds) {
      const fileName = sounds[soundCmd].file;
      if (fileName) return player(message, fileName);
    }
    return false;
  }
}

module.exports = SoundBoardCommand;
