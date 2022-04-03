const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = (req, res) => {
  const { username, email, phone, password, type, role } = req.body;

  db.db.query(
    "SELECT * FROM account where email = ?",
    [email],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .send({ err: err, message: "Error in serving the request" });
      if (result.length > 0)
        return res.status(400).send({ message: "User Exists" });
      else {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          db.db.query(
            "INSERT INTO  account (user_name, email, password, phone, type, role) values (?, ?, ?, ?, ?, ?)",
            [username, email, hash, phone, type, role],
            (err, result) => {
              if (err)
                return res
                  .status(500)
                  .send({ err : err});
              else return res.send({ message: "success" });
            }
          );
        });
      }
    }
  );
};

const googleRegister = (req, res) => {
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
      if (result.length != 0)
        return res.status(400).send({ message: "user Exists" });
      else {
        db.db.query(
          "INSERT INTO account (user_name, email, type, role) VALUES(?, ?, ?, ?)",
          [username, email, type, user],
          (err, results) => {
            if (err)
              return res
                .status(500)
                .send({ memssage: "Error in serving the request" });
            else return res.send({ message: "success" });
          }
        );
      }
    }
  );
};

module.exports = { googleRegister, register };
