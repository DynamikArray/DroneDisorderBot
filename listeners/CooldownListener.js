const { Listener } = require("discord-akairo");

class CooldownListener extends Listener {
  constructor() {
    super("commandCooldown", {
      emitter: "commandHandler",
      eventName: "commandCooldown"
    });
  }

  exec(message) {
    message.reply(
      " ⚠ - WOAH slow down! You are being throttled like bad internet."
    );
  }
}

module.exports = CooldownListener;
