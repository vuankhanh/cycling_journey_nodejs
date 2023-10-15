'use strict'

const express = require('express');
const router = express.Router();

const AuthController = require('../../auth/auth.controller');
const RefreshTokenController = require('../../auth/refresh_token.controller');

router.post('/login', AuthController.login);
router.post('/refresh_token', RefreshTokenController.refresh);

module.exports = router;