'use strict'

const express = require('express');
const router = express.Router();

const isAuth = require('../../middlewares/auth.middleware');
const AuthController = require('../../auth/auth.controller');
const RefreshTokenController = require('../../auth/refresh_token.controller');

router.post('/login', AuthController.login);
router.post('/refresh_token', RefreshTokenController.refresh);
router.post('/config', isAuth, AuthController.config);

module.exports = router;