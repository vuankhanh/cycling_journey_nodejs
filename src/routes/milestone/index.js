'use strict'

const express = require('express');
const router = express.Router();

const MilestoneController = require('../../controllers/milestone.controller');

router.post('', MilestoneController.create);
router.get('', MilestoneController.getAll);
router.get('/:id', MilestoneController.getDetail);
router.put('/:id', MilestoneController.replace);
router.patch('/:id', MilestoneController.modify);
router.delete('/:id', MilestoneController.delete);

module.exports = router;