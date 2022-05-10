const cookieParser = require("cookie-parser");
const Order = require("../../Models/Order");
const Service = require("../../Models/Service");

//get_free_waterServicing_slots_per_day
const freeSlots = async (req, res) => {
  let { date } = req.body;
  if (date === "") res.send("");
  let service = await Service.find(
    { name: "VEHICLE_WATER_SERVICING" },
    { slots: 1, _id: 0, slotLimit: 1 }
  );
  let slots = service[0].slots;
  let slotLimit = service[0].slotLimit;

  let result = await Order.aggregate([
    {
      $match: {
        serviceDate: new Date(date),
      },
    },
    {
      $group: {
        _id: "$slot",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $redact: {
        $cond: {
          if: {
            $gte: ["$count", slotLimit],
          },
          then: "$$DESCEND",
          else: "$$PRUNE",
        },
      },
    },
    {
      $project: {
        _id: 1,
      },
    },
  ]);
  let filled = [];
  result.map((obj) => filled.push(obj._id));
  console.log(filled, slots);
  let freeSlots = slots.filter((x) => !filled.includes(x));

  res.send(freeSlots);
  // db.query(
  //   "SELECT slot.start, slot.end FROM slot LEFT JOIN (SELECT * FROM booking WHERE service_date = ?) AS booked on booked.slot_id = slot.id GROUP BY slot.id HAVING COUNT(slot.id) < 2 ORDER BY slot.start",
  //   [date],
  //   (err, res) => {
  //     if (err) resp.status(500).send(err);
  //     if (!res) resp.status(500).send("invalid format");
  //     console.log(res);
  //     const freeSlots = [];
  //     res.forEach((obj) => {
  //       freeSlots.push([`${obj.start} - ${obj.end}`]);
  //     });
  //     return resp.send(freeSlots);
  //   }
  // );
};

module.exports = { freeSlots };
