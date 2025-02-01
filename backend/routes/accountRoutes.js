const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/account'); // Model User untuk database
const {
  addAccount,
  getAccount,
  getAccounts,
  deleteAccount,
  editAccount,
} = require('../controllers/accountController');

const router = express.Router();

// Route untuk menambah akun
router.post('/add', addAccount);

// Route untuk mendapatkan semua akun
router.get('/', getAccounts);

// Route untuk mendapatkan satu akun berdasarkan ID
router.get('/:id', getAccount);

// Route untuk menghapus akun berdasarkan ID
router.delete('/:id', deleteAccount);

// Route untuk mengedit akun berdasarkan ID
router.put('/:id', editAccount);

// Route untuk login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email.' });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Periksa status akun
    if (user.status === 'non active') {
      return res
        .status(400)
        .json({ message: 'Your account is non-active. Please contact admin.' });
    }

    // Buat JWT token
    const token = jwt.sign(
      // { id: user._id },
      { id: user._id, role: user.role, name: user.name, photo: user.photo },
      'secretKey', // Ganti dengan kunci rahasia Anda
      { expiresIn: '1h' } // Token akan kedaluwarsa setelah 1 jam
    );

    // Kirimkan respon
    res.status(200).json({
      message: 'Login successful',
      status: 'active',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
