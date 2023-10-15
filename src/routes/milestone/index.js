'use strict'

const express = require('express');
const router = express.Router();

const isAuth = require('../../middlewares/auth.middleware');
const MilestoneController = require('../../controllers/milestone.controller');

router.post('',isAuth , MilestoneController.create);
router.get('', MilestoneController.getAll);
router.get('/:id', MilestoneController.getDetail);
router.put('/:id', isAuth, MilestoneController.replace);
router.patch('/:id', isAuth, MilestoneController.modify);
router.delete('/:id', isAuth, MilestoneController.delete);

module.exports = router;