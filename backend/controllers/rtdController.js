const rtd = require ('../models/RTD');
const mongoose = require('mongoose');

//get
const getRTD = async (req, res) => {
    const rtds = await rtd.find();
    res.status(200).json(rtds);
}

module.exports = {
    getRTD
}

