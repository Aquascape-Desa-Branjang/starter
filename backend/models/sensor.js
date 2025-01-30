const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  customId: {
    type: Number,
    required: true,
    unique: true, // Pastikan nilai tidak duplikat
    min: 1,
    max: 40,
  },
  name: { type: String, required: true },
  path: { type: String, required: true },
});

const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = Sensor;
