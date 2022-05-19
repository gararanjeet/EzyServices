const Payment = require("../../Models/Payment");
const crypto = require("crypto");
const { type } = require("os");
require("dotenv").config();

const successPayment = async (req, res) => {
  const paymentInfo = req.body;
  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  shasum.update(JSON.stringify(paymentInfo));
  const digest = shasum.digest("hex");
  const razorpaySignature = req.headers["x-razorpay-signature"];
  try {
    if (digest === razorpaySignature) {
      const payment = new Payment({ payload: paymentInfo.payload.payment.entity });
      console.log(paymentInfo);
      await payment.save();
      require("fs").writeFileSync(
        "payment1.json",
        JSON.stringify(paymentInfo, null, 4)
      );
    }
  } catch (err) {
    console.log(err);
  }
  res.send();
};

module.exports = successPayment;
