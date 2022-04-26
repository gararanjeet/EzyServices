const { db } = require("../../db");
const bcrypt = require("bcrypt");
const { createToken } = require("../../jwt");

const login = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM account WHERE email = ?", [email], (err, result) => {
    if (err)
      return res.status(500).send({ message: "Error in serving the request" });
    if (result.length == 0)
      return res.status(400).send({ message: "no user exists" });
    else {
      bcrypt.compare(password, result[0].password, (err, match) => {
        if (match) {
          const { id, type, user_name, role } = result[0];

          const token = createToken({ id, type, user_name, role });
          // res.cookie("ranjeet", token, { maxAge: 100000, httpOnly: false });
          return res.send({
            message: "success",
            id: id,
            type: type,
            user_name: user_name,
            accessToken: token,
            role: role,
          });
        } else
          res
            .status(400)
            .send({ message: "email password combination is incorrect" });
      });
    }
  });
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
      if (result.length > 0 && result[0].password == null) {
        const { id, type, user_name, role } = result[0];
        const token = createToken({ id, type, user_name, role });
        return res.send({
          message: "success",
          id: id,
          type: type,
          user_name: user_name,
          accessToken: token,
          role: role,
        });
      }
      //  else if (result.length == 0) {
      //   db.db.query(
      //     "INSERT INTO account (user_name, email, type, role) VALUES(?, ?, ?, ?)",
      //     [username, email, type, user],
      //     (err, results) => {
      //       if (err)
      //         return res
      //           .status(500)
      //           .send({ message: "Error in serving the request" });
      //       else return res.send({ message: "success" });
      //     }
      //   );
      // }
      else return res.status(400).send({ message: "Email under use" });
    }
  );
};

module.exports = { login, googleLogin };
