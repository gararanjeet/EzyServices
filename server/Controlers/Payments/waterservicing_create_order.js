const { db } = require("../../db");
const { razorpay } = require("../../razorpay"); //razorpay instance

const waterServicing_order_create = (req, res) => {
  console.log(req.body, req.headers);
  const { subservice } = req.params;
  const payment_capture = 1;
  const currency = "INR";
  const receipt = "Paid for vehicle water Servicing";
  db.query(
    "SELECT price FROM  sub_service WHERE name = ?",
    [subservice],
    (err, result) => {
      if (err) return res.status(500).send(err);
      const amount = result[0].price * 100; // converting into paise
      const options = {
        amount,
        currency,
        receipt,
        payment_capture,
      };
      razorpay.orders
        .create(options)
        .then((response) => {
          res.json({
            id: response.id,
            currency,
            amount,
          });
        })
        .catch((err) => {
          console.log;
        });
    }
  );
};

module.exports = { waterServicing_order_create };
