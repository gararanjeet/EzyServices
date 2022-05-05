const { db } = require("../../db");

const getPrice = (req, res) => {
  const { subservice } = req.params;
  db.query(
    "SELECT price FROM  sub_service WHERE name = ?",
    [subservice],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result[0]);
    }
  );
};

module.exports = { getPrice };
