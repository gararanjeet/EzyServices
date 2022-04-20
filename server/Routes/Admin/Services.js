const { db } = require("../../db");

const getServices = (req, res) => {
  db.query("SELECT name FROM service", [], (err, result) => {
    if (err) res.status(500).send(err);
    res.send(result);
  });
};

module.exports = { getServices };
