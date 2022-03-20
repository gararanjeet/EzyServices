const jwt = require("jsonwebtoken");

const isLogedIn = (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    const token = req.headder;
    console.log(token);
    console.log(accessToken, req, "This is islogedin route");
    if (!accessToken)
      return res.send({ logedIn: false, accessToken: "accessToken" });
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SCRET, (err, user) => {
      if (err) return res.send({ login: false, error: "occured" });
      user.logedIn = true;
      res.send(user);
    });
  } catch (err) {
    return res.send({ logedIn: false, error: "in verify", err, err });
  }
};

module.exports = { isLogedIn };
