const Parameter = require("../models/parameter");
const Sensor = require("../models/sensor");
const mongoose = require("mongoose");

exports.addParameter = async (req, res) => {
  try {
    const { sensor, parameter, name, unit, path } = req.body;

    // Validasi input
    if (!sensor || !parameter || !name || !unit || !path) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Cari sensor berdasarkan customId
    const selectedSensor = await Sensor.findOne({ customId: sensor });
    if (!selectedSensor) {
      return res.status(400).json({ message: "Sensor not found" });
    }

    // Buat fullPath dari path sensor
    const fullPath = selectedSensor.path + path;
    const sensorId = selectedSensor._id;

    // Buat parameter baru
    const newParameter = new Parameter({
      sensor: sensorId,
      parameter,
      name,
      unit,
      path: fullPath,
    });

    // Simpan parameter ke database
    const savedParameter = await newParameter.save();
    res.status(201).json({ message: "Parameter added successfully", savedParameter });
  } catch (error) {
    console.error("Error adding parameter: ", error.message);
    res.status(500).json({ message: "Error adding parameter.", error: error.message });
  }
};

exports.getParameters = async (req, res) => {
  try {
    const {name: collection} = req.params
    // const parameters = await Parameter.find().populate("sensor", "name");
    const response = await mongoose.connection.db.collection(`${collection}`).find({}, {projection: {deviceId: 0, createdAt: 0, updatedAt: 0}}).sort({createdAt: -1}).limit(1).toArray()
    const fieldNames = new Set()
    response.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== '_id') {
          fieldNames.add(key);
        }
      })
    })
    res.status(200).json(Array.from(fieldNames))
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch parameters", error: error.message });
  }
};

exports.getParameter = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari parameter berdasarkan ID
    const parameter = await Parameter.findById(id).populate("sensor", "name");

    if (!parameter) {
      return res.status(404).json({ message: "Parameter not found." });
    }

    res.status(200).json(parameter);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parameter.", error: error.message });
  }
};

exports.editParameter = async (req, res) => {
  try {
    const { id } = req.params;
    const { sensor, parameter, name, unit, path } = req.body;

    // Cari sensor berdasarkan customId jika sensor diperbarui
    let updatedPath = path;
    if (sensor) {
      const selectedSensor = await Sensor.findOne({ customId: sensor });
      if (!selectedSensor) {
        return res.status(400).json({ message: "Sensor not found." });
      }
      updatedPath = selectedSensor.path + path;
    }

    // Update parameter
    const updatedParameter = await Parameter.findByIdAndUpdate(
      id,
      { sensor, parameter, name, unit, path: updatedPath },
      { new: true, runValidators: true }
    );

    if (!updatedParameter) {
      return res.status(404).json({ message: "Parameter not found." });
    }

    res.status(200).json(updatedParameter);
  } catch (error) {
    res.status(500).json({ message: "Error updating parameter.", error: error.message });
  }
};

exports.deleteParameter = async (req, res) => {
  try {
    const { id } = req.params;

    // Hapus parameter berdasarkan ID
    const deletedParameter = await Parameter.findByIdAndDelete(id);
    if (!deletedParameter) {
      return res.status(404).json({ message: "Parameter not found." });
    }

    res.status(200).json({ message: "Parameter deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting parameter.", error: error.message });
  }
};

exports.getSensors = async (req, res) => {
  try {
    // const sensors = await Sensor.find({}, "customId name _id path");
    const collection = await mongoose.connection.db.listCollections().toArray()
    const filteredCollection = collection.filter(item => item.name !== 'accounts' && item.name !== 'parameters' && item.name !== 'sensors');
    const collectionNames = filteredCollection.map(item => item.name);

    res.status(200).json(collectionNames);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sensors" });
  }
};

exports.getSensor = async (req, res) => {
  try {
    const sensorId = req.params.id; // _id dari sensor

    // Pastikan sensorId adalah ObjectId yang valid
    if (!mongoose.Types.ObjectId.isValid(sensorId)) {
      return res.status(400).json({ message: "Invalid Sensor ID format." });
    }

    // Cari sensor berdasarkan _id
    const sensor = await Sensor.findById(sensorId);
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }

    res.status(200).json(sensor);
  } catch (error) {
    console.error("Error fetching sensor:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

