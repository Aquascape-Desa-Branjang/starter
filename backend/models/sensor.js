const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model("Sensor", sensorSchema);
