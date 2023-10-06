'use strict'

const express = require('express');
const router = express.Router();

const AlbumController = require('../../controllers/album.controller');

router.post('', AlbumController.create);
router.get('', AlbumController.getAll);
router.get('/:route', AlbumController.getDetail);
router.put('', AlbumController.replace);
router.patch('', AlbumController.modify);
router.delete('', AlbumController.delete);

module.exports = router;