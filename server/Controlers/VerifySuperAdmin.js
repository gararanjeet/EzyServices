const { verify } = require("jsonwebtoken");

const verifySuperAdmin = (req, res, next) => {
  const { accessToken } = req.body;
  if (!accessToken) return res.status(400).send("AccessDenied");
  try {
    const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SCRET);
    if (validToken.type === "MANAGER" && validToken.role === "SUPER_ADMIN") {
      console.log(validToken);
      return next();
    }
    console.log(validToken);
    return res.status(400).send("AccessDenied");
  } catch (error) {
    return res.status(400).send(error);
  }
  next();
};

module.exports = { verifySuperAdmin };