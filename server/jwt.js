const { sign } = require("jsonwebtoken");

const createToken = (user) => {
  const { id, user_name, type, role } = user;
  const accessToken = sign(
    { id: id, username: user_name, type: type, role: role },
    process.env.ACCESS_TOKEN_SCRET
  );
  return accessToken;
};

module.exports = { createToken };
