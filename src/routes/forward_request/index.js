'use strict'

const express = require('express');
const googleRoute = require('./google');

const router = express.Router();

router.use('/google', googleRoute);

module.exports = router;