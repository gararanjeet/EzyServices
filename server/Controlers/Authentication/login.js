const bcrypt = require("bcrypt");
const { createToken } = require("../../jwt");
const { sendMail } = require("../../mail");
const { mailinfo } = require("../../mail_info");
const Account = require("../../Models/Account");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Account.find({ email });
    if (user.length == 0)
      return res.status(400).send({ message: "no user exists" });
    const match = await bcrypt.compare(password, user[0].password);
    if (!match)
      return res
        .status(400)
        .send({ message: "email password combination is incorrect" });
    const { id, type, role } = user[0];
    const token = createToken({ id, type, role });
    return res.send({ id, type, role, token });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

const googleLogin = async (req, res) => {
  const type = "CUSTOMER";
  const role = "USER";
  const { email, username } = req.body;
  try {
    const user = await Account.find({ email });
    if (user[0]?.length > 0 && user[0].password == undefined) {
      const { id, type, role } = user[0];
      const token = createToken({ id, type, role });
      return res.send({ id, type, role, token });
    } else if (user.length === 0) {
      const account = new Account({
        userName: username,
        email,
        type,
        role,
        isActive: 1,
      });
      const inserted = await account.save();
      sendMail({
        to: email,
        subject: mailinfo.UserRegister.subject,
        text: mailinfo.UserRegister.text,
      });
      const { id } = inserted;
      const token = createToken({ id, type, role });
      return res.send({ id, type, role, token });
    }
    console.log(user.length);
    res.send("hello");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { login, googleLogin };
