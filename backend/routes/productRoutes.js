const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/', controller.getProducts);
router.get('/create', controller.create);
router.post('/', controller.store);
router.get('/:id/edit', controller.edit);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
