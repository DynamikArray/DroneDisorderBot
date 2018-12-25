const { Command } = require("discord-akairo");
const { player } = require("../../util/player.js");
const userPerms = require("../../util/userPerms.js");

class BaitinCommand extends Command {
  constructor() {
    super("baitin", {
      aliases: ["baitin"],
      ownerOnly: true,
      category: "admin"
    });
  }

  userPermissions(message) {
    return userPerms(message);
  }

  exec(message) {
    return player(message, "baitin.mp3");
  }
}

module.exports = BaitinCommand;
