const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inverterSolisSchema = new Schema({
    active_power: {
        type: Number,
        required: true,
    },
    total_energy: {
        type: Number,
        required: true,
    },
    this_month_energy: {
        type: Number,
        required: true,
    },
    last_month_energy: {
        type: Number,
        required: true,
    },
    today_energy: {
        type: Number,
        required: true,
    },
    last_day_energy: {
        type: Number,
        required: true,
    },
    this_year_energy: {
        type: Number,
        required: true,
    },
    last_year_energy: {
        type: Number,
        required: true,
    },
    dc_voltage: {
        type: Number,
        required: true,
    },
    dc_current: {
        type: Number,
        required: true,
    },
    inverter_temperature: {
        type: Number,
        required: true,
    },
    ac_frequency: {
        type: Number,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('inverterSolis', inverterSolisSchema);