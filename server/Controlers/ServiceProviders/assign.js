const Order = require("../../Models/Order");
const Account = require("../../Models/Account");
const OrderStatus = require("../../Models/OrderStatus");

const serviceProvider_assign = async (req, res) => {
  const { booking_id, serviceProvider_id } = req.body;

  try {
    const result = await Order.updateOne(
      { _id: booking_id },
      {
        $set: { status: "AWAITING", assignedTo: serviceProvider_id },
      },
      {
        $currectDate: { $updatedAt: Date },
      }
    );

    const manager = await Account.findOne(
      {
        type: "MANAGER",
        role: "SUPER_ADMIN",
      },
      {
        _id: 1,
      }
    );

    const orderStatus = new OrderStatus({
      bookingId: booking_id,
      status: "AWAITING",
      statusBy: manager._id,
    });

    const inserted = await orderStatus.save();
    console.log(inserted);
    res.send();
  } catch (err) {
    console.log(err);
    res.send(err);
  }

  // db.query(
  //   "UPDATE `booking` SET `status` = ?, `assigned_to` = ? WHERE `id`=?",
  //   ["AWAITING", serviceProvider_id, booking_id],
  //   (err, result) => {
  //     if (err) return res.status(500).send(err);
  //     db.query(
  //       "SELECT `id` FROM `account` WHERE type = ? AND role = ?",
  //       ["MANAGER", "SUPER_ADMIN"],
  //       (err, result) => {
  //         if (err) return res.status(500).send(err);
  //         const { id } = result[0];
  //         db.query(
  //           "INSERT INTO booking_status (booking_id, status, status_by) VALUES (?,?,?);",
  //           [booking_id, "AWAITING", id],
  //           (err, result) => {
  //             if (err) return res.status(500).send(err);
  //             return res.send();
  //           }
  //         );
  //       }
  //     );
  //   }
  // );
};

module.exports = { serviceProvider_assign };
