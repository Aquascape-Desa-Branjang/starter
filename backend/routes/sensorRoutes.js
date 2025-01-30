const express = require('express');
const {
  addSensor,
  getSensor,
  getSensors,
  deleteSensor,
  editSensor,
} = require('../controllers/sensorController');

const router = express.Router();

router.post('/add', addSensor);

router.get('/', getSensors);

router.get('/:id', getSensor);

router.delete('/:id', deleteSensor);

router.put('/:id', editSensor);

module.exports = router;
