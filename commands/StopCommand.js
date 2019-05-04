const { Command } = require("discord-akairo");
const { player } = require("../sounds/player.js");
const { userPerms } = require("./userPerms.js");

class StopCommand extends Command {
  constructor() {
    super("stop", {
      aliases: ["stop"]
      //category: "admin"
    });
  }

  /*
  userPermissions(message) {
    return userPerms(message);
  }
  */

  exec(message) {
    return player(message, false);
  }
}

module.exports = StopCommand;
