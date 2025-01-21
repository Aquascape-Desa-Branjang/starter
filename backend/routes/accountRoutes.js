const express = require('express');
const {
  addAccount,
  getAccounts,
  deleteAccount,
  editAccount,
} = require('../controllers/accountController');

const router = express.Router();

// Route untuk menambah akun
router.post('/add', addAccount);

// Route untuk mendapatkan semua akun
router.get('/', getAccounts);

// Route untuk menghapus akun berdasarkan ID
router.delete('/:id', deleteAccount);

// Route untuk mengedit akun berdasarkan ID
router.put('/:id', editAccount);

module.exports = router;
