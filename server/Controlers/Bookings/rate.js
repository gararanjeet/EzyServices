const Order = require("../../Models/Order");

const booking_rate = async (req, res) => {
  const { id, rating } = req.body;
  try {
    const result = await Order.updateOne(
      { _id: id },
      {
        $set: { rating: rating },
      },
      {
        $currectDate: { $updatedAt: Date },
      }
    );
    console.log(result);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = { booking_rate };
