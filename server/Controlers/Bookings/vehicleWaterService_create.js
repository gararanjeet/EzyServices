const { db } = require("../../db");
const { sendMail } = require("../../mail");
const { mailinfo } = require("../../mail_info");
const Account = require("../../Models/Account");
const Order = require("../../Models/Order");
const OrderStatus = require("../../Models/OrderStatus");
const Service = require("../../Models/Service");
const Slot = require("../../Models/Slot");
const SubService = require("../../Models/SubService");

const getId = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `1V` + day + month + hours + minutes;
};
// booking_vehicleWaterService_create
const booking_vehicleWaterService_create = async (req, res) => {
  let {
    user_id,
    name,
    phone,
    email,
    vehicle,
    modal,
    date,
    slot,
    address,
    price,
  } = req.body;
  try {
    const user = await Account.findOne({ _id: user_id });
    if (user.length === 0) return res.status(400).send("user doesnt exist");

    const order = new Order({
      bookingUid: getId(),
      service: "VEHICLE_WATER_SERVICING",
      subService: vehicle,
      serviceDate: date,
      slot,
      address,
      accountId: user_id,
      name,
      phone,
      email,
      status: "PENDING",
      price,
    });

    const instered = await order.save();
    sendMail({
      to: user.email,
      subject: mailinfo.WaterService.subject,
      text: mailinfo.WaterService.text,
    });

    const orderStatus = new OrderStatus({
      bookingId: instered._id,
      status: "PENDING",
      statusBy: user._id,
    });

    await orderStatus.save();

    return res.send({
      message: "Booking Successfull",
      booking_id: instered.bookingUid,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = { booking_vehicleWaterService_create };
