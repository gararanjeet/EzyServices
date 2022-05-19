const mongoose = require("mongoose");
require("dotenv").config();

// replace the uri string with your connection string.
const uri = process.env.DB_URL;
try {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect", e);
}
