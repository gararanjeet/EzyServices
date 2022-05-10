const Order = require("../../Models/Order");
const OrderStatus = require("../../Models/OrderStatus");

const service_vehicleWaterServicing_complete = async (req, res) => {
  const { serviceProviderId, bookingId } = req.body;
  try {
    await Order.findOneAndUpdate(
      { _id: bookingId },
      { $set: { status: "COMPLETED" } }
    );

    const orderStatus = new OrderStatus({
      bookingId,
      status: "COMPLETED",
      statusBy: serviceProviderId,
    });
    await orderStatus.save();
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { service_vehicleWaterServicing_complete };
