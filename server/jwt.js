const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const { id, user_name, type, role } = user;
  const accessToken = sign(
    { id: id, username: user_name, type: type, role: role },
    process.env.ACCESS_TOKEN_SCRET
  );
  return accessToken;
};

const validateToke = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) return res.status(400).json("Access Denied");
  try {
    const validToke = verify(accessToken, "ItAJWTScreat");
    if (validToke) req.authenticated = true;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { createToken, validateToke };
