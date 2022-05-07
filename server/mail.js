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
    await transport.sendMail(mailOptions);
  } catch {}
};
module.exports = { sendMail };
