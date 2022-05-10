const Order = require("../../Models/Order");
const OrderStatus = require("../../Models/OrderStatus");

const serviceProvider_decision = async (req, res) => {
  const { bookingId, serviceProviderId, action } = req.body;

  if (!["ACCEPTED", "REJECTED"].includes(action))
    return res.status(400).send("invalid action");

  try {
    await Order.findOneAndUpdate(
      { _id: bookingId },
      { $set: { status: action } }
    );

    const orderStatus = new OrderStatus({
      bookingId: bookingId,
      status: action,
      statusBy: serviceProviderId,
    });
    await orderStatus.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  // db.query(
  //   "UPDATE `booking` SET `status` = ? WHERE `id`=?",
  //   [action, booking_id],
  //   (err, result) => {
  //     if (err) return res.status(500).send(err);
  //     db.query(
  //       "INSERT INTO booking_status (booking_id, status, status_by) VALUES (?,?,?);",
  //       [booking_id, action, serviceProvider_id],
  //       (err, result) => {
  //         if (err) return res.status(500).send(err);
  //         return res.send();
  //       }
  //     );
  //   }
  // );
};

module.exports = { serviceProvider_decision };
