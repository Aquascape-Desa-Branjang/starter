const express = require("express");
const {
    getInverterSolis,
    getInverterSolisgraph,
    addInverterSolis
} = require('../controllers/inverterSolisController');

const router = express.Router();

//get
router.get('/', getInverterSolis);

router.get('/graph', getInverterSolisgraph)

//post
router.post('/:deviceId', addInverterSolis);

module.exports = router;