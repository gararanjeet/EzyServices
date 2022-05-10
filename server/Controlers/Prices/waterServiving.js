const { db } = require("../../db");
const Service = require("../../Models/Service");

const getPrice = async (req, res) => {
  const { subservice } = req.params;

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
    amount = amount[0].subServices.price;
    res.send({ price: amount });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { getPrice };
