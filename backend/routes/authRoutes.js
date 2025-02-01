const express = require('express');
const {checkAuth, login, logout} = require('../controllers/auth.accountController');
const {protectRoute} = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', protectRoute, checkAuth);

module.exports = router;

