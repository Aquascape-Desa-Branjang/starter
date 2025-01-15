const disOxy = require ('../models/dissolvedOxygen');
const mongoose = require('mongoose');

//get
const getDO = async (req, res) => {
    const DO = await disOxy.findOne({}, null, { sort: { createdAt: -1 } });
    res.status(200).json(DO)
}

//add
const addDO = async (req, res) => {
    const {oksigen_terlarut} = req.body

    try {
        const DO = await disOxy.create({oksigen_terlarut})
        res.status(200).json(DO)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getDO,
    addDO
}