const mongoose = require('mongoose');

const Schema = mongoose.Schema

const weatherStationSchema = new Schema({
    indoor_temperature: {
        type: Number,
        required: true,
    },
    indoor_humidity: {
        type: Number,
        required: true,
    },
    barometric_pressure: {
        type: Number,
        required: true,
    },
    wind_direction: {
        type: Number,
        required: true,
    },
    rain_fall: {
        type: Number,
        required: true,
    },
    wind_speed: {
        type: Number,
        required: true,
    },
    dew_point: { 
        type: Number,
        required: true,
    },
    outdoor_humidity: {
        type: Number,
        required: true,
    },
    outdoor_temperature: {
        type: Number,
        required: true,
    },
    uv_index: {
        type: Number,
        required: true,
    },
    light: {
        type: Number,
        required: true,
    },
    deviceId: {
        type: String,
        required: true,
    }
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model('weatherStation', weatherStationSchema);