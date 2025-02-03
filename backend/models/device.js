const mongoose = require('mongoose');

const Schema = mongoose.Schema

const deviceSchema = new Schema({
    name: {
        type: Number,
    },
    deviceId: {
        type: String,
    },
    description: {
      type: String
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('device', deviceSchema);