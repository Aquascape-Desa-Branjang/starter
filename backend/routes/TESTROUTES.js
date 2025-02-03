const express = require('express');
const {
    getAllData,

} = require('../controllers/TEST');

const router = express.Router();

//get
router.get('/', getAllData);

module.exports = router;