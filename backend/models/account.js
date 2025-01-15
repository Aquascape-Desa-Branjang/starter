const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    type: Buffer,
    required: false,
  },
}, { timestamps: true });

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
