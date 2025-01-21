const multer = require('multer');
const bcrypt = require('bcryptjs');
const Account = require('../models/account');
const fs = require('fs'); // Untuk menangani gambar default

// Konfigurasi multer untuk upload file
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Batas ukuran file 50MB
}).single('photo');

// Foto default jika tidak ada yang diunggah
const defaultPhoto = fs.readFileSync('path/to/default/profile/photo.jpg'); // Ganti dengan path gambar default Anda

// Tambahkan akun
const addAccount = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File size exceeds the maximum limit of 50MB.' });
      }
      return res.status(400).json({ message: 'File upload error: ' + err.message });
    }

    try {
      const { name, email, password, role, status } = req.body;

      // Validasi input
      if (!name || !email || !password || !role || !status) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // Memeriksa apakah email sudah digunakan
      const existingAccount = await Account.findOne({ email });
      if (existingAccount) {
        return res.status(400).json({ message: `Email ${email} is already in use.` });
      }

      // Enkripsi password sebelum menyimpannya
      const hashedPassword = await bcrypt.hash(password, 10);

      // Menggunakan foto yang diupload atau foto default
      const photo = req.file ? req.file.buffer : defaultPhoto;

      // Membuat akun baru
      const newAccount = new Account({
        name,
        email,
        password: hashedPassword,
        role,
        status,
        photo,
      });

      // Simpan akun ke MongoDB
      await newAccount.save();

      res.status(201).json({ message: 'Account successfully created!', account: newAccount });
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ message: 'Error creating account' });
    }
  });
};

// Mendapatkan semua akun
const getAccounts = async (req, res) => {
  try {
    const { status, role } = req.query;

    // Filter berdasarkan status atau role jika ada
    const query = {};
    if (status) query.status = status;
    if (role) query.role = role;

    const accounts = await Account.find(query, '-password'); // Jangan kirim password
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Error fetching accounts' });
  }
};

// Menghapus akun berdasarkan ID
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    res.json({ message: 'Account successfully deleted!' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: 'Error deleting account' });
  }
};

// Mengedit akun berdasarkan ID
const editAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status } = req.body;

    // Validasi input
    if (!name || !email || !role || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { name, email, role, status },
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found or could not be updated.' });
    }

    res.json({ message: 'Account successfully updated!', account: updatedAccount });
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ message: 'Error updating account' });
  }
};

module.exports = {
  addAccount,
  getAccounts,
  deleteAccount,
  editAccount,
};
