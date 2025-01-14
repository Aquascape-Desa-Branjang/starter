const ws = require ('../models/weatherStation');
const mongoose = require('mongoose')

const getWS = async (req, res) => {
    const weatherStation = await ws.find()
    res.status(200).json(weatherStation)
}

module.exports = {
    getWS
}
