const { Command } = require("discord-akairo");
const { player } = require("../../util/player.js");
const userPerms = require("../../util/userPerms.js");

class FailHornCommand extends Command {
  constructor() {
    super("fail", {
      aliases: ["fail"],
      category: "admin"
    });
  }
  userPermissions(message) {
    return userPerms(message);
  }

  exec(message) {
    return player(message, "failhorn.mp3");
  }
}

module.exports = FailHornCommand;
