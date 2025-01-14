const iSolis = require ('../models/inverterSolis');
const mongoose = require('mongoose');

//get
const getInverterSolis = async (req, res) => {
    const inverterSolis = await iSolis.findOne({})
    res.status(200).json(inverterSolis)
}

module.exports = {
    getInverterSolis,
}