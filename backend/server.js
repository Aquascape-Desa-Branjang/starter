const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const sequelize = require('./config/db');
require('./models/setting');

const Setting = require("./models/setting");
const seedSettings = require("./seeders/settingSeeder");
const User = require("./models/user");
const seedUsers = require("./seeders/userSeeder");
const verifyToken = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const settingRoutes = require("./routes/settingRoutes");

const {io, app, server} = require("./lib/socket")

dotenv.config()

// Middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.18.11:3000", "http://192.168.18.166:3000"],
    credentials: true
})); // Menangani masalah CORS
app.use(express.json()); // Menangani parsing JSON
app.use(cookieParser()); // Menangani cookie
app.use(express.urlencoded({ extended: true })); // Menangani URL encoded data
app.use(bodyParser.json({ limit: "20mb" })); // Menguraikan JSON
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" })); // Menguraikan URL-encoded

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/settings", verifyToken, settingRoutes);

server.listen(process.env.PORT, 'localhost', async () => {
  console.log(`Express server started on port ${process.env.PORT}`);

  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL (capstone database)');

    await sequelize.sync();
    await seedSettings(Setting); 
    await seedUsers(User); 

  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
});