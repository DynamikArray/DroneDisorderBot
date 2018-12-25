const userPerms = message => {
  const objRoles = message.member.roles;
  if (objRoles.exists(role => role.name === "Admin")) return true;
  if (objRoles.exists(role => role.name === "Moderator")) return true;
  if (objRoles.exists(role => role.name === "Voice Moderator")) return true;
  return false;
};

module.exports = { userPerms };
