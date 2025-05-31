const express = require('express');
const {
    addData,
    getData,
    getGraph
} = require('../controllers/customController')

const router = express.Router();

router.get('/:sensor/:deviceId/graph', getGraph)

router.get('/:sensor/:deviceId', getData);

router.post('/:sensor/:deviceId', addData);

module.exports = router;