const iSRNE = require ('../models/inverterSRNE');
const mongoose = require('mongoose');

//get

const getInverterSRNE = async (req, res) => {
    const inverterSRNE = await iSRNE.findOne()
    res.status(200).json(inverterSRNE)
}

module.exports = {
    getInverterSRNE
}