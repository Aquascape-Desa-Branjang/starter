const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const accountRoutes = require('./routes/accountRoutes');
const dissolvedOxygen = require('./routes/dissolvedOxygen');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi MongoDB
mongoose
  .connect('mongodb://localhost:27017/capstone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/accounts', accountRoutes);
app.use('/api/DO', dissolvedOxygen)

// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
