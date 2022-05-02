const { db } = require("../../db");

const serviceProvider_assign = (req, res) => {
  const { booking_id, serviceProvider_id } = req.body;
  db.query(
    "UPDATE `booking` SET `status` = ?, `assigned_to` = ? WHERE `id`=?",
    ["AWAITING", serviceProvider_id, booking_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      db.query(
        "SELECT `id` FROM `account` WHERE type = ? AND role = ?",
        ["MANAGER", "SUPER_ADMIN"],
        (err, result) => {
          if (err) return res.status(500).send(err);
          const { id } = result[0];
          db.query(
            "INSERT INTO booking_status (booking_id, status, status_by) VALUES (?,?,?);",
            [booking_id, "AWAITING", id],
            (err, result) => {
              if (err) return res.status(500).send(err);
              return res.send();
            }
          );
        }
      );
    }
  );
};

module.exports = { serviceProvider_assign };
