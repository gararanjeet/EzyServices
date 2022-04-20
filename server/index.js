const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { authenticate } = require("./Routes/Authentication/authenticate.js");
const { waterServicing } = require("./Routes/waterServicing/waterServicing.js");
const { Admin } = require("./Routes/Admin/Admin.js");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/authenticate", authenticate);

app.use("/waterServicing", waterServicing);

app.use("/Admin", Admin);

app.listen(8000, () => {
  console.log("Servere is running");
});
