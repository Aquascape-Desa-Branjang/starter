const mongoose = require('mongoose');

const Schema = mongoose.Schema

const RTDSchema = new Schema({
    suhu_permukaan_photovoltaic: {
        type: Number,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('RTD', RTDSchema);