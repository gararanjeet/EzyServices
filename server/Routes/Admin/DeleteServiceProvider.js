const { db } = require("../../db");

const deleteServiceProvider = (req, res) => {
  const { id } = req.body;
  db.query(
    "UPDATE account SET state = 0 WHERE account.id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      else return res.send("success");
    }
  );
};

module.exports = { deleteServiceProvider };