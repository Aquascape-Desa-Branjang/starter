const express = require('express');
const { addAccount, getAccount, getAccounts, deleteAccount, editAccount } = require('../controllers/accountController');
const User = require('../models/account'); // Model User untuk mencari akun
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); // Import JWT

// Route untuk menambah akun
router.post('/add', addAccount);

// Route untuk mendapatkan semua akun
router.get('/', getAccounts);

// Route untuk mendapatkan semua akun
router.get('/:id', getAccount);

// Route untuk menghapus akun berdasarkan ID
router.delete('/:id', deleteAccount);

// Route untuk mengedit akun berdasarkan ID
router.put('/:id', editAccount);

// Route untuk login
router.post("/login", async (req, res) => {
  const { email } = req.body;  // Hanya menerima email dari body request
  
  try {
    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email." });
    }

    // Periksa status akun
    if (user.status === "non active") {
      return res.status(400).json({ message: "Your account is non-active. Please contact admin." });
    }

    // Membuat JWT token setelah akun terverifikasi
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, photo: user.photo },  // Payload (data yang ingin disimpan dalam token)
      'secretKey',                       // Secret key untuk signing token
      { expiresIn: '1h' }                // Token akan kedaluwarsa setelah 1 jam
    );

    // Jika akun aktif, kembalikan status aktif dan kirimkan token
    return res.status(200).json({
      message: "Login successful",
      status: "active",
      token,  // Mengirim token untuk autentikasi selanjutnya
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
