const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { authenticate } = require("./Routes/authenticate.js");
const { Bookings } = require("./Routes/bookings.js");
const { ServiceProvider } = require("./Routes/serviceProvider.js");
const { FreeSlots } = require("./Routes/freeSlots.js");
const { Services } = require("./Routes/services.js");
const { Price } = require("./Routes/price.js");
const { Payment } = require("./Routes/payments.js");

const Service = require("./Models/Service");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/authenticate", authenticate);

app.use("/Booking", Bookings);

app.use("/ServiceProvider", ServiceProvider);

app.use("/FreeSlot", FreeSlots);

app.use("/Service", Services);

app.use("/Price", Price);

app.use("/Payment", Payment);

app.get("/hello", async (req, res) => {

});

app.listen(8000, () => {
  console.log("Servere is running");
});
