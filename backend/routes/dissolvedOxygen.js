const express = require('express');
const {
    getDO,
    addDO
} = require('../controllers/doController');

const router = express.Router();

//get
router.get('/', getDO);

//post
router.post('/', addDO);

module.exports = router;