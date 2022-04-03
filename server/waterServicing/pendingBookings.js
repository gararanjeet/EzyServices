const { db } = require("../db");

const getPendingBookings = (req, res) => {
  db.query(
    "SELECT booking_uid, name, mail, phone_no, address, service_date, s.start, s.end FROM booking as b JOIN slot as s ON s.id = b.slot_id  WHERE b.status = 'pending';",
    ["pending"],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send(result);
    }
  );
};

module.exports = { getPendingBookings };
