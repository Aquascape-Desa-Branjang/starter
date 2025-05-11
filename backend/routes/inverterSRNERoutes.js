const express = require('express');
const {
    getInverterSRNE,
    getInverterSRNEgraph,
    addInverterSRNE
} = require('../controllers/inverterSRNEController');

const router = express.Router();

//get
router.get('/', getInverterSRNE);

router.get('/graph', getInverterSRNEgraph)

//post
router.post('/:deviceId', addInverterSRNE);

module.exports = router;