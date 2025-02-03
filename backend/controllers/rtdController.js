const rtd = require ('../models/RTD');
const mongoose = require('mongoose');
const {io} = require('../lib/socket');


//get
const getRTDData = async (req, res) => {
    const rtd = await mongoose.connection.db.collection('rtds').find({}).sort({createdAt: -1}).limit(1).toArray()
    res.status(200).json(rtd);
}

const getRTDGraph = async (req, res) => {
    const rtd = await mongoose.connection.db.collection('rtds').find({}).sort({createdAt: -1}).limit(10).toArray()
    res.status(200).json(rtd);
}

//post
const addRTDData = async (req, res) => {
    const requestBody = req.body
    const { deviceId } = req.params

    try {
        requestBody.deviceId = deviceId
        for (const key in requestBody) {
            if (!rtd.schema.path(key)) {
                rtd.schema.add({
                    [key]: {
                        type: Number
                    }
                })
            }
        }
        const response = await rtd.create(requestBody)

        io.emit("newData", requestBody.suhu_permukaan_photovoltaic)

        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    getRTDData,
    getRTDGraph,
    addRTDData
}

