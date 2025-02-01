const express = require('express');
const {
    getDO,
    getDOgraph,
    addDO
} = require('../controllers/doController');

const router = express.Router();

//get
router.get('/', getDO);

router.get('/graph', getDOgraph)

//post
router.post('/:deviceId', addDO);

module.exports = router;