const mongoose = require('mongoose');
const dissolvedOxygen = require('../models/dissolvedOxygen');
const {io} = require('../lib/socket');

//get
const getDO = async (req, res) => {
    const DO = await mongoose.connection.db.collection('dissolvedoxygens').find({}).sort({createdAt: -1}).limit(1).toArray()
    res.status(200).json(DO)
}

//get graph
const getDOgraph = async (req, res) => {
    const DO = await mongoose.connection.db.collection('dissolvedoxygens').find({}).sort({createdAt: -1}).limit(10).toArray()
    res.status(200).json(DO)
}

//add
const addDO = async (req, res) => {
    const requestBody = req.body
    const { deviceId } = req.params

    try {
        requestBody.deviceId = deviceId
        for (const key in requestBody) {
            if (!dissolvedOxygen.schema.path(key)) {
                dissolvedOxygen.schema.add({
                    [key]: {
                        type: Number
                    }
                })
            }
        }
        const DO = await dissolvedOxygen.create(requestBody)

        io.emit("newData", requestBody.oksigen_terlarut)

        res.status(200).json(DO)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDO,
    getDOgraph,
    addDO
}