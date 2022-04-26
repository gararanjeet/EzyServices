const { db } = require("../../db");

//get_free_waterServicing_slots_per_day
const freeSlots = (req, resp) => {
  console.log(req.body);
  let date = req.body.date;
  if (date === "") resp.send("");
  date = date.slice(0, 10);
  console.log(date);
  db.query(
    "SELECT slot.start, slot.end FROM slot LEFT JOIN (SELECT * FROM booking WHERE service_date = ?) AS booked on booked.slot_id = slot.id GROUP BY slot.id HAVING COUNT(slot.id) < 2 ORDER BY slot.start",
    [date],
    (err, res) => {
      if (err) resp.status(500).send(err);
      if (!res) resp.status(500).send("invalid format");
      console.log(res);
      const freeSlots = [];
      res.forEach((obj) => {
        freeSlots.push([`${obj.start} - ${obj.end}`]);
      });
      return resp.send(freeSlots);
    }
  );
};

module.exports = { freeSlots };