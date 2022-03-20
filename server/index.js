const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { login, googleLogin } = require("./login");
const { register, googleRegister } = require("./register");
const { isLogedIn } = require("./isLogin");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.post("/googleRegister", googleRegister);

app.post("/register", register);

app.post("/login", login);

app.post("/googleLogin", googleLogin);

app.get("/isLogedIn", (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    // const token = req.headder;
    console.log(token);
    console.log(accessToken, req, "This is islogedin route");
    if (!accessToken)
      return res.send({ logedIn: false, accessToken: "accessToken" });
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SCRET, (err, user) => {
      if (err) return res.send({ login: false, error: "occured" });
      user.logedIn = true;
      res.send(user);
    });
  } catch (err) {
    return res.send({ logedIn: false, error: "in verify", err, err });
  }
});

app.listen(8000, () => {
  console.log("Servere is running");
});
