'use strict'

const express = require('express');
const authRoute = require('./auth');
const milestoneRoute = require('./milestone');
const albumRoute = require('./album');
const forwarRequestRoute = require('./forward_request');
const polylineRoute = require('./polyline');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/milestone', milestoneRoute);
router.use('/album', albumRoute);
router.use('/forward', forwarRequestRoute);
router.use('/polyline', polylineRoute)
module.exports = router;