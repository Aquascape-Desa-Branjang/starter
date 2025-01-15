const express = require('express');
const { addAccount } = require('../controllers/accountController');

const router = express.Router();

// Route untuk menambah akun
router.post('/add', addAccount);

module.exports = router;
