const { db } = require("../../db");

const serviceProvider_decision = (req, res) => {
  const { booking_id, serviceProvider_id, action } = req.body;
  if (!["ACCEPTED", "REJECTED"].includes(action))
    return res.status(400).send("invalid action");
  db.query(
    "UPDATE `booking` SET `status` = ? WHERE `id`=?",
    [action, booking_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      db.query(
        "INSERT INTO booking_status (booking_id, status, status_by) VALUES (?,?,?);",
        [booking_id, action, serviceProvider_id],
        (err, result) => {
          if (err) return res.status(500).send(err);
          return res.send();
        }
      );
    }
  );
};

module.exports = { serviceProvider_decision };
