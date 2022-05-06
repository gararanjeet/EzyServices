const { verify } = require("jsonwebtoken");

const verifySuperAdmin = (req, res, next) => {
  console.log(req.body, req.headers, req.query);
  let { token } = req.headers;
  token = token.split(" ")[1];
  console.log("came here");
  if (!token) return res.status(400).send("AccessDenied");
  try {
    const validToken = verify(token, process.env.ACCESS_TOKEN_SCRET);
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
