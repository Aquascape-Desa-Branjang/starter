const express = require('express');
const {
    getRTDData,
    getRTDGraph,
    addRTDData
} = require('../controllers/rtdController')

const router = express.Router();

//get
router.get('/', getRTDData);

router.get('/graph', getRTDGraph)

//post
router.post('/:deviceId', addRTDData);

module.exports = router;