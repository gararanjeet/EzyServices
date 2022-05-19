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
    const user = await Account.findOne({ email });
    if (user && user?.password == undefined) {
      console.log("came here");
      const { id, type, role } = user;
      const token = createToken({ id, type, role });
      return res.send({ id, type, role, token });
    } else if (user === null) {
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
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { login, googleLogin };
