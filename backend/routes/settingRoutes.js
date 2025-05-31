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
const {
  getSettingGeneral,
  setSettingGeneral,
} = require('../controllers/settingGeneralController');
const {
  getSettingAbout,
  setSettingAbout,
} = require('../controllers/settingAboutController');

const router = express.Router();

router.get('/', getSettings);

router.get('/home', getSettingHome);
router.put('/home', setSettingHome);

router.get('/general', getSettingGeneral);
router.put('/general', setSettingGeneral);

router.get('/about', getSettingAbout);
router.put('/about', setSettingAbout);

router.get('/:id', getSetting);
router.put('/:id', editSetting);

module.exports = router;
