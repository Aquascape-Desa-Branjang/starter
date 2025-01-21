const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const Account = require("./models/account"); // Model untuk akun

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer untuk meng-handle file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/capstone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB (capstone database)"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// API Endpoint untuk menambahkan akun
app.post("/api/accounts/add", upload.single("photo"), async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;
    const photo = req.file ? req.file.buffer.toString("base64") : null;

    const newAccount = new Account({
      name,
      email,
      password,
      role,
      status,
      photo,
    });

    await newAccount.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Error creating account" });
  }
});

// Start Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
