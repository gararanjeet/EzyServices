const bcrypt = require("bcrypt");
const { sendMail } = require("../../mail");
const { mailinfo } = require("../../mail_info");
const Account = require("../../Models/Account");
const saltRounds = 10;

const register = async (req, res) => {
  const { userName, email, phone, password, type, role } = req.body;
  const isActive = 1;

  try {
    const users = await Account.find({ email });

    if (users.length > 0)
      return res.status(400).send({ message: "User Exists" });

    const hash = await bcrypt.hash(password, saltRounds);

    const account = new Account({
      userName,
      email,
      phone,
      password: hash,
      type,
      role,
      isActive,
    });

    await account.save();

    sendMail({
      to: email,
      subject: mailinfo.UserRegister.subject,
      text: mailinfo.UserRegister.text,
    });

    return res.send({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = { register };
