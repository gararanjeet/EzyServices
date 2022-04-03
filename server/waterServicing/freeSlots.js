const { db } = require("../db");

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

// query for getting free slots (slots which are booked less than 2)
// select slot.start from slot LEFT join (select * from booking where service_date = '2022-03-30') AS t1 on t1.slot_id = slot.id group by slot.id HAVING COUNT(slot.id) < 2 ORDER BY slot.start
