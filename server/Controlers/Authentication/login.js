const { db } = require("../../db");
const bcrypt = require("bcrypt");
const { createToken } = require("../../jwt");
const { sendMail } = require("../../mail");
const { mailinfo } = require("../../mail_info");

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
          const { id, type, role } = result[0];
          const token = createToken({ id, type, role });
          return res.send({ id, type, role, token });
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
  db.query("SELECT * FROM account WHERE email = ?", [email], (err, result) => {
    if (err)
      return res.status(500).send({ message: "Error in serving the request" });
    if (result.length > 0 && result[0].password == null) {
      const { id, type, role } = result[0];
      const token = createToken({ id, type, role });
      return res.send({ id, type, role, token });
    } else if (result.length == 0) {
      db.query(
        "INSERT INTO account (user_name, email, type, role) VALUES(?, ?, ?, ?)",
        [username, email, type, user],
        (err, results) => {
          if (err) return res.status(500).send(err);
          sendMail({
            to: email,
            subject: mailinfo.UserRegister.subject,
            text: mailinfo.UserRegister.text,
          });
          db.query(
            "SELECT * FROM account WHERE email = ?",
            [email],
            (err, result) => {
              if (result.length > 0 && result[0].password == null) {
                const { id, type, role } = result[0];
                const token = createToken({ id, type, role });
                return res.send({ id, type, role, token });
              }
            }
          );
        }
      );
    } else return res.status(400).send({ message: "Email under use" });
  });
};

module.exports = { login, googleLogin };
