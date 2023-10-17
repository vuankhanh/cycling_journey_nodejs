'use strict'

const MilestoneDirectionController = require('../../controllers/milestone_direction.controller');

const express = require('express');
const router = express.Router();

router.get('', MilestoneDirectionController.getLastPolylines);

module.exports = router;