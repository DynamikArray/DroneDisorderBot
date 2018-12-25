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
      const dispatcher = connection.playFile(
        path.join(__dirname, "/audio/" + audioFile),
        { volume: 0.15 }
      );
      dispatcher.on("end", () => {
        voiceChannel.leave();
      });
    })
    .catch(err => message.reply(err.message));
};

module.exports = { player };
