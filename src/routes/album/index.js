'use strict'

const express = require('express');
const router = express.Router();

const isAuth = require('../../middlewares/auth.middleware');
const AlbumController = require('../../controllers/album.controller');

router.post('', isAuth, AlbumController.create);
router.get('', AlbumController.getAll);
router.get('/detail', AlbumController.getDetail);
router.put('/:id', isAuth, AlbumController.replace);
router.patch('/:id', isAuth, AlbumController.modify);
router.delete('/:id', isAuth, AlbumController.delete);

module.exports = router;