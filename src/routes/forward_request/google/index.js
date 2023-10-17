'use strict'

const express = require('express');
const router = express.Router();

const isAuth = require('../../../middlewares/auth.middleware');
const MilestoneDirectionController = require('../../../controllers/milestone_direction.controller');

router.post('/update_directions', isAuth, MilestoneDirectionController.update);

module.exports = router;