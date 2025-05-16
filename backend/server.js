const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const Sequelize = require("sequelize");

const accountRoutes = require("./routes/accountRoutes");
const displayItemRoutes = require("./routes/displayItemRoutes");
const authRoutes = require("./routes/authRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const parameterRoutes = require("./routes/parameterRoutes");
const settingRoutes = require("./routes/settingRoutes");

const dissolvedOxygenRoutes = require("./routes/dissolvedOxygenRoutes");
const inverterSolisRoutes = require("./routes/inverterSolisRoutes");
const inverterSRNERoutes = require("./routes/inverterSRNERoutes");
const pyranometerRoutes = require("./routes/pyranometerRoutes");
const rtdRoutes = require("./routes/rtdRoutes");
const vfdRoutes = require("./routes/vfdRoutes");
const wsRoutes = require("./routes/wsRoutes");
const customRoutes = require("./routes/customRoutes")

const {io, app, server} = require("./lib/socket")

const defineSettingModel = require("./models/setting");
const seedSettings = require("./seeders/settingSeeder");

dotenv.config()

const port = 5000;

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
app.use("/api/accounts", accountRoutes);
app.use('/api/displayitems', displayItemRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/sensors", sensorRoutes);
app.use("/api/parameters", parameterRoutes);
app.use("/api/settings", settingRoutes);

app.use('/api/dissolvedoxygen', dissolvedOxygenRoutes)
app.use('/api/InverterSolis', inverterSolisRoutes)
app.use('/api/InverterSRNE', inverterSRNERoutes)
app.use('/api/pyranometer', pyranometerRoutes)
app.use('/api/rtd', rtdRoutes)
app.use('/api/vfd', vfdRoutes)
app.use('/api/ws', wsRoutes)
app.use("/api/custom", customRoutes)

// server.listen(port, 'localhost', () => {
//     console.log(`Express server started on port ${port}`)
//     mongoose
//         // .connect("mongodb://localhost:27017/capstone")
//         .connect(process.env.MONGODB_URI)
//         .then(() => console.log("Connected to MongoDB (capstone database)"))
//         .catch((err) => console.error("Error connecting to MongoDB:", err));
// })
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

const Setting = defineSettingModel(sequelize);

server.listen(process.env.PORT, 'localhost', async () => {
  console.log(`Express server started on port ${process.env.PORT}`);

  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL (capstone database)');

    await sequelize.sync();
    await seedSettings(Setting); 

  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
});