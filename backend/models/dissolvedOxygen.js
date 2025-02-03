const mongoose = require('mongoose');

const Schema = mongoose.Schema

const dissolvedOxygenSchema = new Schema({
    oksigen_terlarut: {
        type: Number,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('dissolvedOxygen', dissolvedOxygenSchema);