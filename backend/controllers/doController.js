const disOxy = require ('../models/dissolvedOxygen');
const mongoose = require('mongoose');

//get
const getDO = async (req, res) => {
    const DO = await disOxy.findOne()
    res.status(200).json(DO)
}

module.exports = {
    getDO
}