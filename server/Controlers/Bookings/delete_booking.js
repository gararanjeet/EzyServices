const { db } = require("../../db");

const booking_delete = (req, res) => {
  const { booking_id, id } = req.body;
  console.log(booking_id, id);
  db.query(
    "UPDATE booking SET `status` = ? WHERE id = ? ",
    ["CANCELLED", booking_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      db.query(
        "INSERT INTO booking_status (booking_id, status, status_by) VALUES(?,?,?)",
        [booking_id, "CANCELLED", id],
        (err, result) => {
          if (err) return res.status(500).send(err);
          res.send();
        }
      );
    }
  );
};

module.exports = { booking_delete };
