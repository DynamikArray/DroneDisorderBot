/*
  There has to be a better way to do this...
 */
const userPerms = message => {
  const roles = ["Admin", "Moderator", "Voice Moderator", "DDBot"];
  const objRoles = message.member.roles;

  if (objRoles.some(role => roles.includes(role.name))) {
    return true;
  }

  return false;
};

module.exports = { userPerms };
