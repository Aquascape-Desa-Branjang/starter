const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const sequelize = require('./config/db');
require('./models/setting');

const verifyToken = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const settingRoutes = require("./routes/settingRoutes");
const productCategoryRoutes = require("./routes/productCategoryRoutes");
const productRoutes = require("./routes/productRoutes");
const newsRoutes = require("./routes/newsRoutes");

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
app.use("/api/auth", authRoutes);
app.use("/api/settings", verifyToken, settingRoutes);
app.use("/api/product-categories", verifyToken, productCategoryRoutes);
app.use("/api/products", verifyToken, productRoutes);
app.use("/api/news", verifyToken, newsRoutes);

server.listen(process.env.PORT, 'localhost', async () => {
  console.log(`Express server started on port ${process.env.PORT}`);

  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL (capstone database)');

    await sequelize.sync();

  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
});