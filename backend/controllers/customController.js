const mongoose = require('mongoose');

async function collectionExists(db, collectionName) {
    const collections = await db.listCollections().toArray();
    return collections.some(collection => collection.name === collectionName);
}

const addData = async (req, res) => {
    const collectionName = req.params.sensor
    const deviceId = req.params.deviceId
    const data = req.body

    const combinedData = {
        ...data,
        deviceId,
        createdAt: new Date()
    }

    try {
        const exist = await collectionExists(mongoose.connection.db, collectionName)

        if(!exist) {
            await mongoose.connection.db.createCollection(collectionName)
        }

        const response = await mongoose.connection.db.collection(collectionName).insertOne(combinedData)
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({message: "Error inserting custom data", error})
    }
}

const getData = async (req, res) => {
    const deviceId = req.params.deviceId
    const collectionName = req.params.sensor
    try {
        const response = await mongoose.connection.db.collection(collectionName).find({deviceId: deviceId}).sort({createdAt: -1}).limit(1).toArray()
        res.status(200).json(response)
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({error: error.message})
    }
}

const getGraph = async (req, res) => {
    const deviceId = req.params.deviceId
    const collectionName = req.params.sensor
    try {
        const response = await mongoose.connection.db.collection(collectionName).find({deviceId: deviceId}).sort({createdAt: -1}).limit(10).toArray()
        res.status(200).json(response)
    } catch (error) {
        console.error("Error fetching graph:", error);
        res.status(500).json({error: error.message})
    }
}

// const getDevices = async (req, res) => {
//     try {
//         await client.connect()
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
//     const devices = await
// }

module.exports = {
    addData,
    getData,
    getGraph
}

