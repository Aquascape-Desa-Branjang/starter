const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inverterSolistSchema = new Schema({
    active_power: {
        type: Number,
    },
    total_energy: {
        type: Number,
    },
    this_month_energy: {
        type: Number,
    },
    last_month_energy: {
        type: Number,
    },
    today_energy: {
        type: Number,
    },
    last_day_energy: {
        type: Number,
    },
    this_year_energy: {
        type: Number,
    },
    last_year_energy: {
        type: Number,
    },
    dc_voltage: {
        type: Number,
    },
    dc_current: {
        type: Number,
    },
    inverter_temperature: {
        type: Number,
    },
    ac_frequency: {
        type: Number,
    }
}, {timestamps: true});