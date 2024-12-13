const express = require('express');
const router = express.Router();

const { createFees, getFees, getFeesById, updateFees, deleteFees } = require('../Controller/feescontoller');

router.post('/create', createFees);
router.get('/', getFees);
router.get('/:id', getFeesById);
router.put('/:id', updateFees);
router.delete('/:id', deleteFees);

module.exports = router;