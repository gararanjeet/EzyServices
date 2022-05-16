const { default: mongoose } = require("mongoose");
const { db } = require("../../db");
const Order = require("../../Models/Order");
//bookings_list_user
const bookings_list_user = async (req, res) => {
  const { id } = req.query; //for frontend
  // const { id } = req.body;//for postman
  try {
    console.log("here");
    console.log(id);
    const result = await Order.aggregate([
      {
        $match: {
          accountId: mongoose.Types.ObjectId(id),
        },
      },
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
          name: 1,
          phone: 1,
          address: 1,
          email: 1,
          assignedTo: 1,
          assignedName: { $first: "$assigned.userName" },
          service: 1,
          subService: 1,
          serviceDate: 1,
          slot: 1,
          status: 1,
          price: 1,
          rating: 1,
        },
      },
    ]);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { bookings_list_user };
