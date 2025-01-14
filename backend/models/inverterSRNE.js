const mongoose = require('mongoose');

const Schema = mongoose.Schema

const inverterSRNESchema = new Schema({
    inverter_power: {
        type: Number,
    },
    battery_level: {
        type: Number
    },
    battery_last_equalization: {
        type: Number
    },
    battery_voltage: {
        type: Number
    },
    pv_voltage: {
        type: Number,
    },
    pv_current: {
        type: Number,
    },
    pv_power: {
        type: Number,
    },
    charge_power: {
        type: Number
    },
    battery_charge_state: {
        type: Number
    },
    inverter_operation: {
        type: Number
    },
    inverter_current: {
        type: Number
    },
    main_charge_current: {
        type: Number
    },
    pv_charge_current: {
        type: Number
    },
    pv_daily_consumption: {
        type: Number
    },
    battery_charge_daily: {
        type: Number
    },
    battery_discharge_daily: {
        type: Number
    },
    load_daily_consumption: {
        type: Number
    },
    inverter_uptime: {
        type: Number
    },
    pv_generated: {
        type: Number
    },
    main_load_power_daily: {
        type: Number
    },
    dc_dc_temperature: {
        type: Number
    },
    dc_ac_temperature: {
        type: Number
    },
    translator_temperature: {
        type: Number
    },
    load_ratio: {
        type: Number
    }
}, {timestamps: true});

module.exports = mongoose.model('inverterSRNE', inverterSRNESchema);