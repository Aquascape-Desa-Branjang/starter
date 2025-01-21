const pyr = require ('../models/pyranometer');
const mongoose = require('mongoose');

//get
const getPyranometerData = async (req, res) => {
    const pyranometer = await pyr.findOne()
    res.status(200).json(pyranometer);
}

//post
const addPyranometerData = async (req, res) => {
    const {radiasi_matahari} = req.body

    try {
        const pyranometer = await pyr.create({radiasi_matahari})
        res.status(200).json(pyranometer)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getPyranometerData,
    addPyranometerData
}