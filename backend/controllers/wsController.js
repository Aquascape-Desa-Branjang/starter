const mongoose = require('mongoose')
const ws = require ('../models/weatherStation');
const {io} = require('../lib/socket');

const getWS = async (req, res) => {
    try {
        const WS = await mongoose.connection.db.collection('weatherstations').find({}).sort({createdAt: -1}).limit(1).toArray()
        res.status(200).json(WS)
    } catch (error) {
        console.error("Error fetching Weather Station :", error);
        res.status(500).json({error: error.message})
    }
}

const getWSgraph = async (req, res) => {
    try {
        const WS = await mongoose.connection.db.collection('weatherstations').find({}).sort({createdAt: -1}).limit(10).toArray()
        res.status(200).json(WS)
    } catch (error) {
        console.error("Error fetching Weather Station :", error);
        res.status(500).json({error: error.message})
    }
}

const addWS = async (req, res) => {
    const requestBody = req.body
    const { deviceId } = req.params

    try {
        requestBody.deviceId = deviceId
        for (const key in requestBody) {
            if (!ws.schema.path(key)) {
                ws.schema.add({
                    [key]: {
                        type: Number
                    }
                })
            }
        }
        const WS = await ws.create(requestBody)

        io.emit("newData", requestBody.indoor_temperature)
        io.emit("newData", requestBody.indoor_humidity)
        io.emit("newData", requestBody.barometric_pressure)
        io.emit("newData", requestBody.wind_direction)
        io.emit("newData", requestBody.rain_fall)

        io.emit("newData", requestBody.wind_speed)
        io.emit("newData", requestBody.dew_point)
        io.emit("newData", requestBody.outdoor_humidity)
        io.emit("newData", requestBody.outdoor_temperature)
        io.emit("newData", requestBody.uv_index)

        io.emit("newData", requestBody.light)

        res.status(200).json(WS)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getWS,
    getWSgraph,
    addWS
}