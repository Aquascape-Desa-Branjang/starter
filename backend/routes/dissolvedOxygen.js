const express = require('express');
const {
    getDO
} = require('../controllers/doController');

const router = express.Router();

//get
router.get('/do', getDO);

module.exports = router;