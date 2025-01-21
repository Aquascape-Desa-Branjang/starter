const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const accountRoutes = require("./routes/accountRoutes");

const app = express();
const port = 5000;

// Middleware
app.use(cors()); // Menangani masalah CORS
app.use(express.json()); // Menangani parsing JSON
app.use(express.urlencoded({ extended: true })); // Menangani URL encoded data

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

// Start Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
