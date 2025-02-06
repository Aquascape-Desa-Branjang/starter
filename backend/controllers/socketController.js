const dissolvedOxygen = require('../models/dissolvedOxygen');
const {io} = require('../lib/socket');

const listen = (sensor, device, data) => {
    io.emit(`${sensor}-${device}`, data)

}

module.exports = {

}