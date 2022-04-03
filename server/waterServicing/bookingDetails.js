const { db } = require("../db");

const bookingDetails = (req, res) => {
  const { booking_id, user_id } = req.body;
  db.query(
    "SELECT * FROM booking WHERE booking_uid = ? and account_id = ?",
    [booking_id, user_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length == 0)
        return res.status(400).send("No results found!!!");
      res.send(result);
    }
  );
};
module.exports = { bookingDetails };
