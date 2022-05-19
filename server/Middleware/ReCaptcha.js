require("dotenv").config();
const axios = require("axios");

const verifyHuman = async (req, res, next) => {
  const { recaptchatoken } = req.headers;
  const secret = process.env.RECAPTCHA_KEY_PRIVATE_KEY;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchatoken}`
  );
  if (response.data.success) return next();
  return res.status(400).send({ message: "Bots are now allowed" });
};

module.exports = { verifyHuman };
