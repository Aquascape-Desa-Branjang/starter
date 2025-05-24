const express = require('express');
const {
    getVFD,
    getVFDgraph,
    addVFD
} = require('../controllers/vfdController');

const router = express.Router();

//get
router.get('/', getVFD);

router.get('/graph', getVFDgraph)

//post
router.post('/:deviceId', addVFD);

module.exports = router;