const mongoose = require('mongoose');
const inverterSolis = require('../../models/inverterSolis');
const {io} = require('../../lib/socket');
const displayItem = require("../../models/displayItem");

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

    const response = await displayItem.find({sensor: 'invertersolis', device: deviceId}).limit(1)

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

        if(response) {
            io.emit(`invertersolis${deviceId}`, InverterSolis)
        }

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