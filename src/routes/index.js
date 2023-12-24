'use strict'

const express = require('express');
const authRoute = require('./auth');
const milestoneRoute = require('./milestone');
const albumRoute = require('./album');
const forwarRequestRoute = require('./forward_request');
const polylineRoute = require('./polyline');
const configController = require('../controllers/config.controller');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/milestone', milestoneRoute);
router.use('/album', albumRoute);
router.use('/forward', forwarRequestRoute);
router.use('/polyline', polylineRoute)
router.get('/config', configController.get)
module.exports = router;