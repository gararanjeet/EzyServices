const Account = require("../../Models/Account");
//serviceProvider_list
const serviceProvider_list = async (req, res) => {
  try {
    const result = await Account.find(
      {
        type: "SERVICE_PROVIDER",
        isActive: true,
      },
      { _id: 1, userName: 1, email: 1, phone: 1, role: 1 }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  // db.query(
  //   "SELECT id, user_name, email, phone, role FROM `account` WHERE type = ? AND state = ?",
  //   ["SERVICE_PROVIDER", 1],
  //   (err, result) => {
  //     if (err) res.status(500).send("Error in database!!!");
  //     res.send(result);
  //   }
  // );
};

module.exports = { serviceProvider_list };
