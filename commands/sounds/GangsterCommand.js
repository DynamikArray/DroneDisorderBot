const { Command } = require("discord-akairo");
const { player } = require("../../util/player.js");
const userPerms = require("../../util/userPerms.js");

class GangsterCommand extends Command {
  constructor() {
    super("gangster", {
      aliases: ["gangster"],
      category: "admin"
    });
  }

  userPermissions(message) {
    return userPerms(message);
  }

  exec(message) {
    return player(message, "gangster.mp3");
  }
}

module.exports = GangsterCommand;
