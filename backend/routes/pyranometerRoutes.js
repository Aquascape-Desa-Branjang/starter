const express = require('express');
const {
    getPyranometerData,
    addPyranometerData
} = require('../controllers/pyranometerController')

const router = express.Router();

//get
router.get('/', getPyranometerData);

//post
router.post('/', addPyranometerData);

module.exports = router;