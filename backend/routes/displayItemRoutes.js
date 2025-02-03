const express = require('express');
const {
    getDisplayItems,
    addDisplayItem,
    deleteDisplayItem,
    getDisplayItem,
    updateDisplayItem
} = require('../controllers/displayItemController');

const router = express.Router();

router.get('/', getDisplayItems);

router.get('/:id', getDisplayItem);

router.post('/', addDisplayItem);

router.put('/:id', updateDisplayItem)

router.delete('/:id', deleteDisplayItem);

module.exports = router;