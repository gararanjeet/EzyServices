const { db } = require("../../db");
//bookings_list_user
const bookings_list_user = (req, res) => {
  const { user_id } = req.body;
  db.query(
    "SELECT booking_uid, name as service, sub_service, service_date, start, end, price, status FROM (SELECT booking_uid,service_date, sub_service_id, status, start, end, name  FROM ( SELECT booking_uid,service_date,b.service_id, sub_service_id, status, start, end FROM `booking` as b INNER JOIN `slot` as s on s.id = b.slot_id WHERE ? ) as result INNER JOIN service on result.service_id = service.id) AS result INNER JOIN sub_service ON result.sub_service_id = sub_service.id",
    [user_id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length == 0)
        return res.status(400).send("No results found!!!");
      console.table(result);
      res.send(result);
    }
  );
};

module.exports = { bookings_list_user };
