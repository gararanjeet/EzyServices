const { db } = require("../../db");
const Order = require("../../Models/Order");
//bookings_list_user
const bookings_list_user = async (req, res) => {
  const { id } = req.query;//for frontend
  // const { id } = req.body;//for postman
  try {
    console.log("here");
    const result = await Order.aggregate([
      {
        $lookup: {
          from: "accounts",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assigned",
        },
      },
      {
        $project: {
          _id: 1,
          bookingUid: 1,
          serviceDate: 1,
          slot: 1,
          status: 1,
          service: 1,
          subService: 1,
          assignedName: { $first: "$assigned.userName" },
          price: 1,
        },
      },
    ]);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  // db.query(
  //   "SELECT b.id as booking_id, b.booking_uid, b.service_date, slot.start, slot.end, s.name as 'service', sub.name as sub_service, sub.price, a.user_name as 'assigned', b.status FROM booking as b LEFT JOIN slot on slot.id = b.slot_id LEFT JOIN service as s on s.id = b.service_id LEFT JOIN sub_service sub on sub.id = b.sub_service_id LEFT JOIN account as a on a.id = b.assigned_to  WHERE b.account_id = ?",
  //   [id],
  //   (err, result) => {
  //     if (err) return res.status(500).send(err);
  //     // console.table(result);
  //     res.send(result);
  //   }
  // );
};

module.exports = { bookings_list_user };
