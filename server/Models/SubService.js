const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subServiceSchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "service",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: String,
    required: true,
  },
});

// module.exports = mongoose.model("SubService", subServiceSchema);
