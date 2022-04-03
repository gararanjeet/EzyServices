const jwt = require("jsonwebtoken");

const isLogedIn = (req, res) => {
  try {
    let { token } = req.headers;
    token = token.split(" ")[1];
    console.log(token);
    if (!token) return res.send({ logedIn: false });
    jwt.verify(token, process.env.ACCESS_TOKEN_SCRET, (err, user) => {
      if (err) return res.send({ login: false, error: "occured" });
      user.logedIn = true;
      res.send(user);
    });
  } catch (err) {
    return res.send({ logedIn: false, error: "in verify", err, err });
  }
};

module.exports = { isLogedIn };
