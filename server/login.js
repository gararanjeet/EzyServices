const db = require("./db");
const bcrypt = require("bcrypt");
const { createToken } = require("./jwt");

const login = (req, res) => {
  const { email, password } = req.body;
  db.db.query(
    "SELECT * FROM account WHERE email = ?",
    [email],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error in serving the request" });
      if (result.length == 0)
        return res.status(400).send({ message: "no user exists" });
      else {
        bcrypt.compare(password, result[0].password, (err, match) => {
          if (match) {
            const accessToken = createToken(result[0]);
            res.cookie("accessToken", accessToken, {
              maxAge: 86400000,
              httpOnly: true,
            });
            return res.send({ message: "success", accessToken: accessToken });
          } else
            res
              .status(400)
              .send({ message: "email password combination is incorrect" });
        });
      }
    }
  );
};

const googleLogin = (req, res) => {
  const type = "CUSTOMER";
  const user = "USER";
  const { email, username } = req.body;
  db.db.query(
    "SELECT * FROM account WHERE email = ?",
    [email],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error in serving the request" });
      if (result.length > 0 && result[0].password == null)
        return res.send({ message: "success" });
      else if (result.length == 0) {
        db.db.query(
          "INSERT INTO account (user_name, email, type, role) VALUES(?, ?, ?, ?)",
          [username, email, type, user],
          (err, results) => {
            if (err)
              return res
                .status(500)
                .send({ message: "Error in serving the request" });
            else return res.send({ message: "success" });
          }
        );
      } else return res.status(400).send({ message: "Email under use" });
    }
  );
};

module.exports = { login, googleLogin };
