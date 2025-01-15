const mongoose = require('mongoose');

const Schema = mongoose.Schema

const weatherStationSchema = new Schema({
    indoor_temperature: {
        type: Number
    },
    indoor_humidity: {
        type: Number,
    },
    barometric_pressure: {
        type: Number,
    },
    wind_direction: {
        type: Number,
    },
    rain_fall: {
        type: Number,
    },
    wind_speed: {
        type: Number,
    },
    dew_point: { //heat index
        type: Number,
    },
    outdoor_humidity: {
        type: Number,
    },
    outdoor_temperature: {
        type: Number,
    },
    uv_index: {
        type: Number,
    },
    light: {
        type: Number,
    }
}, {timestamps: true, versionKey: false})

module.exports = mongoose.model('weatherStation', weatherStationSchema);