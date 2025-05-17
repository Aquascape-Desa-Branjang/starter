const express = require('express');
const Setting = require('../models/setting');
const {
  getSetting,
  getSettings,
  editSetting,
} = require('../controllers/settingController');
const {
  getSettingHome,
  setSettingHome,
} = require('../controllers/settingHomeController');

const router = express.Router();

router.get('/', getSettings);
router.get('/home', getSettingHome);
router.put('/home', setSettingHome);

router.get('/:id', getSetting);
router.put('/:id', editSetting);

module.exports = router;
