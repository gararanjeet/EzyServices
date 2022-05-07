const mongoose = require("mongoose");

// replace the uri string with your connection string.
const uri =
  "mongodb+srv://root:1234@cluster0.wncwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

try {
  mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}
