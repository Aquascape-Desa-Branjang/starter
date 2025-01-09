const mongoose = require('mongoose');

const Schema = mongoose.Schema

const pyranometerSchema = new Schema({
    radiasi_matahari: {
        type: Number
    }
}, {timestamps: true});