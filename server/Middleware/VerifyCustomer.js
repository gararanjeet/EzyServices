const { verify } = require("jsonwebtoken");

const verifyCustomer = (req, res, next) => {
  console.log(req.body, req.headers);
  let { token } = req.headers;
  token = token.split(" ")[1];
  if (!token) return res.status(400).send("AccessDenied");
  try {
    const validToken = verify(token, process.env.ACCESS_TOKEN_SCRET);
    if (validToken.type === "CUSTOMER" && validToken.role === "USER") {
      console.log(validToken);
      return next();
    }
    console.log(validToken);
    return res.status(400).send("AccessDenied");
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = { verifyCustomer };
