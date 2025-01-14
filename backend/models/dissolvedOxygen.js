const mongoose = require('mongoose');

const Schema = mongoose.Schema

const dissolvedOxygenSchema = new Schema({
    oksigen_terlarut: {
        type: Number
    }
}, {timestamps: true});

module.exports = mongoose.model('DO', dissolvedOxygenSchema);