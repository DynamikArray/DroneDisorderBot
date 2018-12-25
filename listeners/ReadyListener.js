const { Listener } = require("discord-akairo");

class ReadyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      eventName: "ready"
    });
  }

  exec() {
    console.log("Discord Bot is ready");
  }
}

module.exports = ReadyListener;
