const mongoose = require('mongoose');

const Schema = mongoose.Schema

const RTDSchema = new Schema({
    suhu_permukaan_photovoltaic: {
        type: Number
    }
}, {timestamps: true});

module.exports = mongoose.model('RTD', RTDSchema);