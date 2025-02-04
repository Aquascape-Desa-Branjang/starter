const mongoose = require('mongoose');
const inverterSolis = require('../models/inverterSolis');
const {io} = require('../lib/socket');

const getInverterSolis = async (req, res) => {
    try {
        const InverterSolis = await mongoose.connection.db.collection('invertersolis').find({}).sort({createdAt: -1}).limit(1).toArray()
        res.status(200).json(InverterSolis)
    } catch (error) {
        console.error("Error fetching Inverter Solis:", error);
        res.status(500).json({error: error.message})
    }
}

const getInverterSolisgraph = async (req, res) => {
    try {
        const InverterSolis = await mongoose.connection.db.collection('invertersolis').find({}).sort({createdAt: -1}).limit(10).toArray()
        res.status(200).json(InverterSolis)
    } catch (error) {
        console.error("Error fetching Inverter Solis graph:", error);
        res.status(500).json({error: error.message})
    }
}

const addInverterSolis = async (req, res) => {
    const requestBody = req.body
    const { deviceId } = req.params

    try {
        requestBody.deviceId = deviceId
        for (const key in requestBody) {
            if (!inverterSolis.schema.path(key)) {
                inverterSolis.schema.add({
                    [key]: {
                        type: Number
                    }
                })
            }
        }
        const InverterSolis = await inverterSolis.create(requestBody)

        io.emit("newData", requestBody.active_power)
        io.emit("newData", requestBody.total_energy)
        io.emit("newData", requestBody.this_month_energy)
        io.emit("newData", requestBody.last_month_energy)
        io.emit("newData", requestBody.today_energy)
        io.emit("newData", requestBody.last_day_energy)
        io.emit("newData", requestBody.this_year_energy)
        io.emit("newData", requestBody.last_year_energy)
        io.emit("newData", requestBody.dc_voltage)
        io.emit("newData", requestBody.dc_current)
        io.emit("newData", requestBody.inverter_temperature)
        io.emit("newData", requestBody.ac_frequency)

        res.status(200).json(InverterSolis)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getInverterSolis,
    getInverterSolisgraph,
    addInverterSolis
}