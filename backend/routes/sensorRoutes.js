const express = require('express');
const {
  addSensor,
  getSensor,
  getSensors,
  deleteSensor,
  editSensor,
    updateSensors,
    getDevices
} = require('../controllers/sensorController');

const router = express.Router();

router.get('/update', updateSensors);

router.post('/add', addSensor);

router.get('/', getSensors);

router.get('/:id', getSensor);

router.delete('/:id', deleteSensor);

router.put('/:id', editSensor);

router.get('/:name/devices', getDevices)

module.exports = router;
