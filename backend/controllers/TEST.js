const mongoose = require('mongoose');

//get
const getAllData = async (req, res) => {
    const collection = await mongoose.connection.db.listCollections().toArray()
    const filteredCollection = collection.filter(item => item.name !== 'accounts' && item.name !== 'parameters' && item.name !== 'sensors');
    const collectionNames = filteredCollection.map(item => item.name);

    // const data = await mongoose.connection.db.collection(collectionNames[0]).find({}).sort({createdAt: -1}).limit(1).toArray()
    // res.status(200).json(collectionNames)

    // Initialize an object to hold data from all collections
    const allData = {};

    // Loop through each collection name and fetch data
    for (const name of collectionNames) {
        allData[name] = await mongoose.connection.db.collection(name).find({}).sort({createdAt: -1}).limit(1).toArray(); // Store data in the object with collection name as key
    }

    // Send the collected data as a response
    res.status(200).json(allData);
}

module.exports = {
    getAllData,
}