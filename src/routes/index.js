'use strict'

const express = require('express');
const milestoneRoute = require('./milestone');

const router = express.Router();

router.use('/milestone', milestoneRoute);
module.exports = router;