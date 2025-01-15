const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Pastikan email unik
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  photo: {
    type: Buffer, // Menyimpan foto sebagai buffer
    required: false,
  },
}, { timestamps: true }); // Menambahkan timestamps otomatis

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
