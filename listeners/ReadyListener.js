const { Listener } = require("discord-akairo");

const speakingListening = require("./SpeakingListener");

class ReadyListener extends Listener {
  constructor() {
    super("ready", {
      emitter: "client",
      eventName: "ready"
    });

    this.talkers = new Map();
  }

  exec() {
    console.log("Discord Bot is ready");

    // Or via name (less persistent)
    const voiceChannel = this.client.channels.find("name", "Merry Thicccmasss");

    // Play files natively
    return voiceChannel
      .join()
      .then(connection => {
        connection.on("speaking", (user, state) => {
          //talking
          if (state) {
            //const update = (talkers[user.id].started = Date.now());
            const speaker = this.talkers.get(user.id);

            if (!speaker) {
              this.talkers.set(user.id, {
                name: user.username,
                started: Date.now(),
                totalTime: 0
              });
            }

            if (speaker) {
              this.talkers.set(user.id, {
                name: speaker.name,
                started: Date.now(),
                totalTime: speaker.totalTime
              });
            }
          }

          //stop talking
          if (!state) {
            //const update = (talkers[user.id].started = Date.now());
            const speaker = this.talkers.get(user.id);

            if (!speaker) {
              this.talkers.set(user.id, {
                name: user.username,
                started: false,
                totalTime: 0
              });
            }

            if (speaker) {
              this.talkers.set(user.id, {
                name: speaker.name,
                started: false,
                totalTime: speaker.totalTime + (Date.now() - speaker.started)
              });
            }
          }

          var talker = this.talkers.get(user.id);
          console.log(
            talker.name,
            state ? " finished talking " : "started talking",
            talker.totalTime / 60
          );
          return connection;
        });

        //const dispatcher = connection.playFile("H:/whatup.mp3");
      })
      .catch(console.error);
  }
}

module.exports = ReadyListener;
