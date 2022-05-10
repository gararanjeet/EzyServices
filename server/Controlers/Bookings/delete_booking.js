const Order = require("../../Models/Order");
const OrderStatus = require("../../Models/OrderStatus");

const booking_delete = async (req, res) => {
  const { bookingId, id } = req.body;
  try {
    await Order.findOneAndUpdate(
      { _id: bookingId },
      { $set: { status: "CANCELLED" } }
    );

    const orderStatus = new OrderStatus({
      bookingId,
      status: "CANCELLED",
      statusBy: id,
    });
    await orderStatus.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { booking_delete };
