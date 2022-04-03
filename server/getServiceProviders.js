const { db } = require("./db");

const getServiceProviders = (req, res) => {
  const { type, role } = req.body;
  db.query(
    "SELECT user_name as name, email, phone FROM account WHERE type = ? and role = ? and state = ?",
    [type, role, 1],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
};

module.exports = { getServiceProviders };
