const express = require("express");
const { register, googleRegister } = require("../Controlers/Authentication/register");
const { login, googleLogin } = require("../Controlers/Authentication/login");

const authenticate = express.Router();


authenticate.post("/googleRegister", googleRegister);

authenticate.post("/register", register);

authenticate.post("/login", login);

authenticate.post("/googleLogin", googleLogin);

module.exports ={authenticate}