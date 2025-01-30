const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const accountRoutes = require("./routes/accountRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const parameterRoutes = require("./routes/parameterRoutes");

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Menangani masalah CORS
app.use(bodyParser.json({ limit: "20mb" })); // Menguraikan JSON
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" })); // Menguraikan URL-encoded

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/capstone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB (capstone database)"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// API Routes
app.use("/api/accounts", accountRoutes); // Rute untuk akun
app.use("/api/sensors", sensorRoutes);  // Rute untuk sensor
app.use("/api/parameters", parameterRoutes);  // Rute untuk sensor

// Start Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
