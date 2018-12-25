const sqlite = require("sqlite");

const { AkairoClient } = require("discord-akairo");

class Client extends AkairoClient {
  constructor() {
    super(
      {
        prefix: message => {
          return "~";
        },
        ownerID: process.env.ADMIN_ID.split(","),
        commandDirectory: "./commands/",
        listenerDirectory: "./listeners/",
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 600000
      },
      { disableEveryone: true }
    );
  }
}

module.exports = Client;
