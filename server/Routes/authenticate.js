const express = require("express");
const {
  register,
  googleRegister,
} = require("../Controlers/Authentication/register");
const { login, googleLogin } = require("../Controlers/Authentication/login");
const { verifyHuman } = require("../Middleware/ReCaptcha");

const authenticate = express.Router();

authenticate.post("/register", register);

authenticate.post("/login", verifyHuman, login);

authenticate.post("/googleLogin", googleLogin);

module.exports = { authenticate };
