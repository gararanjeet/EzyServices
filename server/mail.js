const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ezyservices4u@gmail.com",
    pass: "ranjeetandrakesh",
  },
});

const sendMail = async (details) => {
  const mailOptions = {
    from: "ezyservices4u@gmail.com",
    to: details.to,
    subject: details.subject,
    text: details.text,
  };

  try {
    const result = await transport.sendMail(mailOptions);
    console.log(result);
    console.log("helll");
  } catch {
    (err) => console.log(err);
  }
};
module.exports = { sendMail };
