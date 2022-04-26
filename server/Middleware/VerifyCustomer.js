const { verify } = require("jsonwebtoken");

const verifyCustomer = (req, res, next) => {
  const { accessToken } = req.body;
  console.log("bad reqeust");
  if (!accessToken) return res.status(400).send("AccessDenied");
  try {
    const validToken = verify(accessToken, process.env.ACCESS_TOKEN_SCRET);
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
