const express = require('express');
const {
    getWS,
    getWSgraph,
    addWS
} = require('../controllers/wsController');

const router = express.Router();

//get
router.get('/', getWS);

router.get('/graph', getWSgraph)

//post
router.post('/:deviceId', addWS);

module.exports = router;