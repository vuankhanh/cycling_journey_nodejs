'use strict'

const express = require('express');
const milestoneRoute = require('./milestone');
const albumRoute = require('./album');

const router = express.Router();

router.use('/milestone', milestoneRoute);
router.use('/album', albumRoute);
module.exports = router;