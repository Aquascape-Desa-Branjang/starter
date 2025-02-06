const mongoose = require('mongoose');
const inverterSRNE = require('../models/inverterSRNE');
const {io} = require('../lib/socket');

const getInverterSRNE = async (req, res) => {
    try {
        const InverterSRNE = await mongoose.connection.db.collection('invertersrnes').find({}).sort({createdAt: -1}).limit(1).toArray()
        res.status(200).json(InverterSRNE)
    } catch (error) {
        console.error("Error fetching Inverter SRNE:", error);
        res.status(500).json({error: error.message})
    }
}

const getInverterSRNEgraph = async (req, res) => {
    try {
        const InverterSRNE = await mongoose.connection.db.collection('invertersrnes').find({}).sort({createdAt: -1}).limit(10).toArray()
        res.status(200).json(InverterSRNE)
    } catch (error) {
        console.error("Error fetching Inverter SRNE graph:", error);
        res.status(500).json({error: error.message})
    }
}

const addInverterSRNE = async (req, res) => {
    const requestBody = req.body
    const { deviceId } = req.params

    try {
        requestBody.deviceId = deviceId
        for (const key in requestBody) {
            if (!inverterSRNE.schema.path(key)) {
                inverterSRNE.schema.add({
                    [key]: {
                        type: Number
                    }
                })
            }
        }
        const InverterSRNE = await inverterSRNE.create(requestBody)

        io.emit("newData", requestBody.inverter_power)
        io.emit("newData", requestBody.battery_level)
        io.emit("newData", requestBody.battery_last_equalization)
        io.emit("newData", requestBody.battery_voltage)
        io.emit("newData", requestBody.pv_voltage)

        io.emit("newData", requestBody.pv_current)
        io.emit("newData", requestBody.pv_power)
        io.emit("newData", requestBody.charge_power)
        io.emit("newData", requestBody.battery_charge_state)
        io.emit("newData", requestBody.inverter_operation)

        io.emit("newData", requestBody.inverter_current)
        io.emit("newData", requestBody.main_charge_current)
        io.emit("newData", requestBody.pv_charge_current)
        io.emit("newData", requestBody.pv_daily_consumption)
        io.emit("newData", requestBody.battery_charge_daily)
        
        io.emit("newData", requestBody.battery_discharge_daily)
        io.emit("newData", requestBody.load_daily_consumption)
        io.emit("newData", requestBody.inverter_uptime)
        io.emit("newData", requestBody.pv_generated)
        io.emit("newData", requestBody.main_load_power_daily)

        io.emit("newData", requestBody.dc_dc_temperature)
        io.emit("newData", requestBody.dc_ac_temperature)
        io.emit("newData", requestBody.translator_temperature)
        io.emit("newData", requestBody.load_ratio)

        res.status(200).json(InverterSRNE)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getInverterSRNE,
    getInverterSRNEgraph,
    addInverterSRNE
}