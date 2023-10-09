'use strict'

const express = require('express');
const router = express.Router();

const AlbumController = require('../../controllers/album.controller');

router.post('', AlbumController.create);
router.get('', AlbumController.getAll);
router.get('/detail', AlbumController.getDetail);
router.put('/:id', AlbumController.replace);
router.patch('/:id', AlbumController.modify);
router.delete('/:id', AlbumController.delete);

module.exports = router;