const mongoose = require('mongoose');

const parameterSchema = new mongoose.Schema({
  sensor: { type: mongoose.Schema.Types.ObjectId, ref: 'Sensor', required: true },
  parameter: { type: String, required: true },
  name: { type: String, required: true },
  unit: { type: String, required: true },
  path: { type: String, required: true },
});

module.exports = mongoose.model('Parameter', parameterSchema);
