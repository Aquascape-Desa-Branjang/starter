const pyr = require ('../models/pyranometer');
const mongoose = require('mongoose');

//get
const getPyranometer = async (req, res) => {
    const pyranometer = await pyr.findOne()
    res.status(200).json(pyranometer);
}

module.exports = {
    getPyranometer
}