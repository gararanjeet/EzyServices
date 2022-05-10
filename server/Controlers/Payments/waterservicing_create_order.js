const Service = require("../../Models/Service");
const { razorpay } = require("../../razorpay"); //razorpay instance

const waterServicing_order_create = async (req, res) => {
  const { subservice } = req.params;
  const payment_capture = 1;
  const currency = "INR";
  const receipt = "Paid for vehicle water Servicing";

  try {
    let amount = await Service.aggregate([
      {
        $unwind: {
          path: "$subServices",
        },
      },
      {
        $match: {
          "subServices.name": subservice,
        },
      },
    ]);
    amount = amount[0].subServices.price * 100; // converting into paise
    const options = {
      amount,
      currency,
      receipt,
      payment_capture,
    };
    const response = await razorpay.orders.create(options);

    res.json({
      id: response.id,
      currency,
      amount,
    });
  } catch (err) {
    console.log;
    res.send(err);
  }

  // db.query(
  //   "SELECT price FROM  sub_service WHERE name = ?",
  //   [subservice],
  //   (err, result) => {
  //     if (err) return res.status(500).send(err);
  //     const amount = result[0].price * 100; // converting into paise
  //     const options = {
  //       amount,
  //       currency,
  //       receipt,
  //       payment_capture,
  //     };
  //     razorpay.orders
  //       .create(options)
  //       .then((response) => {
  //         res.json({
  //           id: response.id,
  //           currency,
  //           amount,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log;
  //       });
  // }
  // );
};

module.exports = { waterServicing_order_create };
