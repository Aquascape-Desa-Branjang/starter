const express = require('express');
const {checkAuth, login, logout} = require('../controllers/auth.accountController');
const {protectRoute} = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/check', protectRoute, checkAuth);

export default router;

