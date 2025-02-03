const express = require('express');
const router = express.Router();
const {
    getPyranometerData,
    getPyranometerGraph,
    addPyranometerData
} = require('../controllers/pyranometerController')


//get
router.get('/', getPyranometerData);

router.get('/graph', getPyranometerGraph)

//post
router.post('/:deviceId', addPyranometerData);

module.exports = router;