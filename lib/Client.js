const sqlite = require("sqlite");

const { AkairoClient, SQLiteProvider } = require("discord-akairo");

class Client extends AkairoClient {
  constructor() {
    super(
      {
        prefix: message => {
          if (message.guild) {
            // The third param is the default.
            return this.settings.get(message.guild.id, "prefix", "~");
          }
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

    //This table needs to have a field for each setting
    //Currently only "prefix" is stored
    this.settings = new SQLiteProvider(
      sqlite.open("data/config.db"),
      "guild_config",
      {
        idColumn: "guild_id"
        // /  dataColumn: "settings"
      }
    );
  }

  login(token) {
    return this.settings
      .init()
      .then(() => {
        super.login(token);
      })
      .catch(error => {
        console.log("SQLLite Provider Login Error", error);
      });
  }
}

module.exports = Client;
