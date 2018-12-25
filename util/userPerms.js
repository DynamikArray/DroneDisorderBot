const roles = ["Admin", "Moderator", "Voice Moderator"];

const userPerms = message => {
  if (message.member.roles.exists(role => role.name === "Admin")) return true;
  //
  if (message.member.roles.exists(role => role.name === "Moderator"))
    return true;
  //
  if (message.member.roles.exists(role => role.name === "Voice Moderator"))
    return true;
  //
  return false;
};

module.exports = userPerms;
