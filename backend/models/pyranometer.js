const mongoose = require('mongoose');

const Schema = mongoose.Schema

const pyranometerSchema = new Schema({
    radiasi_matahari: {
        type: Number,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('pyranometer', pyranometerSchema);