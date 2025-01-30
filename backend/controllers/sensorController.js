const Sensor = require("../models/sensor");

// Menambahkan sensor baru
const addSensor = async (req, res) => {
  try {
    const { name, path } = req.body;

    // Validasi input
    if (!name || !path) {
      return res.status(400).json({ message: "Name and path are required." });
    }

    // Cari customId yang tersedia di rentang 1-40
    const existingIds = await Sensor.find().distinct("customId");
    const availableIds = Array.from({ length: 40 }, (_, i) => i + 1).filter(
      (id) => !existingIds.includes(id)
    );

    if (availableIds.length === 0) {
      return res.status(400).json({ message: "No available IDs." });
    }

    const newId = availableIds[0]; // Ambil ID terkecil yang tersedia

    // Tambahkan sensor baru
    const newSensor = new Sensor({ customId: newId, name, path });
    await newSensor.save();

    res.status(201).json({
      message: "Sensor added successfully!",
      sensor: newSensor,
    });
  } catch (error) {
    console.error("Error adding sensor:", error);
    res.status(500).json({ message: "Error adding sensor." });
  }
};

// Mendapatkan semua sensor
const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find({}, "customId name _id");
    res.json(sensors);
  } catch (error) {
    console.error("Error fetching sensors:", error);
    res.status(500).json({ message: "Error fetching sensors" });
  }
};

// Mendapatkan sensor berdasarkan customId
const getSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await Sensor.findOne({ customId: id });
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found." });
    }
    res.json(sensor);
  } catch (error) {
    console.error("Error fetching sensor:", error);
    res.status(500).json({ message: "Error fetching sensor" });
  }
};

// Menghapus sensor berdasarkan customId
const deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSensor = await Sensor.findOneAndDelete({ customId: id });

    if (!deletedSensor) {
      return res.status(404).json({ message: "Sensor not found." });
    }

    res.json({ message: "Sensor successfully deleted!" });
  } catch (error) {
    console.error("Error deleting sensor:", error);
    res.status(500).json({ message: "Error deleting sensor" });
  }
};

// Mengedit sensor berdasarkan customId
const editSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, path } = req.body;

    // Validasi data
    if (!name || !path) {
      return res.status(400).json({ message: "Name and path are required." });
    }

    // Update data sensor
    const updatedSensor = await Sensor.findOneAndUpdate(
      { customId: id },
      { name, path },
      { new: true, runValidators: true }
    );

    if (!updatedSensor) {
      return res.status(404).json({ message: "Sensor not found or could not be updated." });
    }

    res.json({ message: "Sensor successfully updated!", sensor: updatedSensor });
  } catch (error) {
    console.error("Error updating sensor:", error);
    res.status(500).json({ message: "Error updating sensor" });
  }
};

module.exports = {
  addSensor,
  getSensors,
  getSensor,
  deleteSensor,
  editSensor,
};
