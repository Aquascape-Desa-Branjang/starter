const express = require('express');
const Setting = require('../models/setting'); // Model User untuk database
const {
  getSetting,
  getSettings,
  editSetting,
} = require('../controllers/settingController');

const router = express.Router();

// Route untuk mendapatkan semua akun
router.get('/', getSettings);

// Route untuk mendapatkan satu akun berdasarkan ID
router.get('/:id', getSetting);

// Route untuk mengedit akun berdasarkan ID
router.put('/:id', editSetting);

module.exports = router;
