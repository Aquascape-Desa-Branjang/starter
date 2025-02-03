const mongoose = require('mongoose');

const createDynamicModel = (collectionName, schemaDefinition) => {
    const schema = new mongoose.Schema(schemaDefinition, {timestamps: true, versionKey: false});
    return mongoose.model(collectionName, schema);
}

const addDevice = async (req, res) => {
    const { collectionName, ...schemaDefinition } = req.body;

    if (!collectionName) {
        return res.status(400).json({error: 'Collection name cannot be empty'});
    }

    try {

    } catch (error) {
        res.status(500).json({error: error.message});
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
    addDevice,
}

