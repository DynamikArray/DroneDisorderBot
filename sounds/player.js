const path = require("path");

const player = (message, audioFile) => {
  const voiceChannel = message.member.voiceChannel;

  if (!voiceChannel) {
    return message.reply(
      "The command is not valid if your not in a voice channel."
    );
  }

  return voiceChannel
    .join()
    .then(connection => {
      let speaking = false;

      const dispatcher = connection.playFile(
        path.join(__dirname, "/audio/" + audioFile),
        { volume: 0.3 }
      );

      dispatcher.on("speaking", val => {
        if (speaking && !val) {
          voiceChannel.leave();
          speaking = false;
        }

        if (!speaking && val) speaking = true;
      });
    })
    .catch(err => message.reply(err.message));
};

module.exports = { player };
