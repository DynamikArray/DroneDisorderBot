const { Command } = require("discord-akairo");
const { player } = require("../../util/player.js");
const userPerms = require("../../util/userPerms.js");

class FourTwentyCommand extends Command {
  constructor() {
    super("420", {
      aliases: ["420"],
      category: "admin"
    });
  }

  userPermissions(message) {
    return userPerms(message);
  }

  exec(message) {
    return player(message, "wannagethigh.mp3");
  }
}

module.exports = FourTwentyCommand;
