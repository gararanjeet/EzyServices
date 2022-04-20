const { db } = require("../../db");

const allServiceProviders = (req, res) => {
  db.query(
    "SELECT id, user_name, email, phone, role FROM `account` WHERE type = ? AND state = ?",
    ["SERVICE_PROVIDER", 1],
    (err, result) => {
      if (err) res.status(500).send("Error in database!!!");
      res.send(result);
    }
  );
};

module.exports = { allServiceProviders };
