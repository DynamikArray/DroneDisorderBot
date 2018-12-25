const { Listener } = require("discord-akairo");

class SpeakingListener extends Listener {
  constructor(ourEmitter) {
    super("speaking", {
      emitter: ourEmitter,
      eventName: "speaking"
    });
  }

  exec(user, speaking) {
    console.log(user, speaking);
  }
}

module.exports = SpeakingListener;
