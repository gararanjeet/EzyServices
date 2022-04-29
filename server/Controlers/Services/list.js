const { db } = require("../../db");
// service_list
const service_list = (req, res) => {
  db.query("SELECT name FROM service", [], (err, result) => {
    if (err) res.status(500).send(err);
    res.send(result);
  });
};

module.exports = { service_list };
