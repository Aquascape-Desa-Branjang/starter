const express = require('express');
const router = express.Router();
const { addAccount } = require('../controllers/accountController'); // Pastikan sudah terhubung dengan controller

// Route untuk menambah akun
router.post('/add', addAccount);

module.exports = router;
