const Account = require("../../Models/Account");
//serviceProvider_delete
const serviceProvider_delete = async (req, res) => {
  const { email } = req.body;
  // console.log(id);
  try {
    const result = await Account.updateOne(
      { email },
      { $set: { isActive: false } },
      {
        $currectDate: { $updatedAt: Date },
      }
    );
    // console.log("it is result", result);
    res.send();
  } catch (err) {
    // console.log(err, "hello");
    res.status(500).send(err);
  }
  // db.query(
  //   "UPDATE account SET state = 0 WHERE account.id = ?",
  //   [id],
  //   (err, result) => {
  //     if (err) return res.status(500).send(err);
  //     else return res.send("success");
  //   }
  // );
};

module.exports = { serviceProvider_delete };
