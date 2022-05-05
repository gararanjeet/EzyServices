const { db } = require("../../db");

const service_vehicleWaterServicing_complete = (req, res) => {
  const { serviceProvider_id, booking_id } = req.body;
  db.query(
    "UPDATE `booking` SET `status` = ? WHERE `id`=?",
    ["COMPLETED", booking_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      db.query(
        "INSERT INTO booking_status (booking_id, status, status_by) VALUES (?,?,?);",
        [booking_id, "COMPLETED", serviceProvider_id],
        (err, result) => {
          if (err) return res.status(500).send(err);
          return res.send();
        }
      );
    }
  );
};

module.exports = { service_vehicleWaterServicing_complete };
