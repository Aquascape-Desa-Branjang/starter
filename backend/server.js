const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const accountRoutes = require("./routes/accountRoutes");
const dissolvedOxygen = require("./routes/dissolvedOxygen");
const pyranometer = require("./routes/pyranometerRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const parameterRoutes = require("./routes/parameterRoutes");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");

const {io, app, server} = require("./lib/socket")

dotenv.config()


// const app = express();
const port = 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})); // Menangani masalah CORS
app.use(express.json()); // Menangani parsing JSON
app.use(express.urlencoded({ extended: true })); // Menangani URL encoded data
// app.use(cors()); // Menangani masalah CORS
app.use(bodyParser.json({ limit: "20mb" })); // Menguraikan JSON
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" })); // Menguraikan URL-encoded

// MongoDB Connection


// API Routes
app.use('/api/DO', dissolvedOxygen)
app.use('/api/pyranometer', pyranometer)
app.use("/api/accounts", accountRoutes); // Rute untuk akun
app.use("/api/sensors", sensorRoutes);  // Rute untuk sensor
app.use("/api/parameters", parameterRoutes);  // Rute untuk sensor
app.use("/api/auth", authRoutes)

// Start Server
// app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

server.listen(port, () => {
    console.log(`Express server started on port ${port}`)
    mongoose
        // .connect("mongodb://localhost:27017/capstone")
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("Connected to MongoDB (capstone database)"))
        .catch((err) => console.error("Error connecting to MongoDB:", err));
})
