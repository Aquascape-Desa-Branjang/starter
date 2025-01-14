const vfd = require ('../models/VFD');
const mongoose = require('mongoose');

//get
const getVFD = async (req, res) => {
    const vfds = await vfd.findOne()
    res.status(200).json(vfds)
}

module.exports = {
    getVFD
}
