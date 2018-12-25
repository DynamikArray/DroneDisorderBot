const { Command } = require("discord-akairo");
const { player } = require("../../util/player.js");
const userPerms = require("../../util/userPerms.js");

class StopCommand extends Command {
  constructor() {
    super("stop", {
      aliases: ["stop"],
      category: "admin"
    });
  }

  userPermissions(message) {
    return userPerms(message);
  }

  exec(message) {
    return player(message, "stop.mp3");
  }
}

module.exports = StopCommand;
