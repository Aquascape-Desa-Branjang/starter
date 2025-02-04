const mongoose = require('mongoose');

const Schema = mongoose.Schema

const inverterSRNESchema = new Schema({
    inverter_power: {
        type: Number,
        required: true,
    },
    battery_level: {
        type: Number,
        required: true,
    },
    battery_last_equalization: {
        type: Number,
        required: true,
    },
    battery_voltage: {
        type: Number,
        required: true,
    },
    pv_voltage: {
        type: Number,
        required: true,
    },
    pv_current: {
        type: Number,
        required: true,
    },
    pv_power: {
        type: Number,
        required: true,
    },
    charge_power: {
        type: Number,
        required: true,
    },
    battery_charge_state: {
        type: Number,
        required: true,
    },
    inverter_operation: {
        type: Number,
        required: true,
    },
    inverter_current: {
        type: Number,
        required: true,
    },
    main_charge_current: {
        type: Number,
        required: true,
    },
    pv_charge_current: {
        type: Number,
        required: true,
    },
    pv_daily_consumption: {
        type: Number,
        required: true,
    },
    battery_charge_daily: {
        type: Number,
        required: true,
    },
    battery_discharge_daily: {
        type: Number,
        required: true,
    },
    load_daily_consumption: {
        type: Number,
        required: true,
    },
    inverter_uptime: {
        type: Number,
        required: true,
    },
    pv_generated: {
        type: Number,
        required: true,
    },
    main_load_power_daily: {
        type: Number,
        required: true,
    },
    dc_dc_temperature: {
        type: Number,
        required: true,
    },
    dc_ac_temperature: {
        type: Number,
        required: true,
    },
    translator_temperature: {
        type: Number,
        required: true,
    },
    load_ratio: {
        type: Number,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    }
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('inverterSRNE', inverterSRNESchema);