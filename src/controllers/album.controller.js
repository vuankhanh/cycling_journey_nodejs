'use strict'

const AlbumService = require('../services/album.service');
const { OK, CREATED } = require('../core/success.response');
const localPathConfig = require('../configs/local_dir');
const proccessImage = require('../helpers/proccess.image');
const processVideo = require('../helpers/proccess.video');
const writeBufferToFile = require('../helpers/write.buffer.to.file');
const replaceToVietnamese = require('../helpers/replace.to.vietnamese');

const multipleUploadMiddleware = require("../middlewares/multiple.upload.middleware");
const { BadRequestError } = require('../core/error.response');
const mongoose = require('mongoose');
class AlbumController {
    create = async (req, res, next) => {
        const query = req.query;
        try {
            if (!query || !query.name) {
                const error = new BadRequestError('Missing parameter', 400)
                next(error)
            } else {
                await multipleUploadMiddleware(req, res);
                const body = req.body;
                const files = req.files;
                if (!files || !files.length) {
                    const error = new BadRequestError('Missing parameter', 400)
                    next(error)
                } else {
                    let objAlbum = {
                        name: query.name,
                        route: replaceToVietnamese(query.name),
                        thumbnail: null,
                        description: body.description,
                        media: [],
                        relativePath: req.customParams.relativePath
                    }
                    const parseIntIsMain = parseInt(body.isMain) | 0;
                    let isMain = parseIntIsMain > files.length - 1 ? 0 : parseIntIsMain;
                    for (let [index, file] of files.entries()) {
                        let objMediaPath = {
                            relativeUrl: '',
                            relativeUrlThumbnail: ''
                        }
                        if (file.mimetype.split('/')[0] === 'image') {
                            let imageAfterResizing = await proccessImage.resize(file.path);
                            imageAfterResizing = imageAfterResizing.replace(/\\/g, "/");
                            let buffer = await proccessImage.thumbnail(imageAfterResizing);
                            let absoluteUrlThumbnail = writeBufferToFile.thumbnail(imageAfterResizing, buffer).replace(/\\/g, "/");
                            objMediaPath.relativeUrl = imageAfterResizing.replace(localPathConfig.album, '');
                            objMediaPath.relativeUrlThumbnail = absoluteUrlThumbnail.replace(localPathConfig.album, '');
                        } else {
                            const absoluteUrlThumbnail = await processVideo(file.destination, file.filename);
                            objMediaPath.relativeUrlThumbnail = absoluteUrlThumbnail.replace(localPathConfig.album, '')
                            objMediaPath.relativeUrl = file.path.replace(/\\/g, "/").replace(localPathConfig.album, '');
                        }

                        let objMedia = {
                            type: file.mimetype.split('/')[0],
                            url: objMediaPath.relativeUrl,
                            thumbnailUrl: objMediaPath.relativeUrlThumbnail,
                            name: file.filename,
                            description: '',
                            caption: '',
                            alternateName: '',
                            isMain: index === isMain ? true : false
                        }

                        objAlbum.media.push(objMedia);
                    }
                    objAlbum.thumbnail = objAlbum.media[isMain].thumbnailUrl;

                    new CREATED({
                        message: 'A new album has been created!',
                        metaData: await AlbumService.create(objAlbum)
                    }).send(res);
                }
            }

        } catch (err) {
            const error = new BadRequestError(err.message, 500)
            next(error)
        }
    }

    getAll = async (req, res, next) => {
        const query = req.query;
        let page = parseInt(query.page) || 1;
        let size = parseInt(query.size) || 10;
        try {
            new OK({
                message: 'success',
                metaData: await AlbumService.getAll(page, size)
            }).send(res);
        } catch (err) {
            const error = new BadRequestError(err.message, 500)
            next(error)
        }
    }

    getDetail = async (req, res, next) => {
        try {
            const route = req.query.route;
            const id = req.query.id;
            const conditional = {};
            if (route) {
                conditional.route = route;
            } else {
                conditional._id = new mongoose.Types.ObjectId(id)
            }

            new OK({
                message: 'success',
                metaData: await AlbumService.getDetail(conditional)
            }).send(res);
        } catch (err) {
            console.log(err);
            const error = new BadRequestError(err.message, 500)
            next(error)
        }
    }

    replace = async (req, res, next) => {
        try {
            const id = req.params.id;
            return res.status(200).json(await AlbumService.replace());
        } catch (err) {
            const error = new BadRequestError(err.message, 500)
            next(error)
        }
    }

    modify = async (req, res, next) => {
        const id = req.params.id;
        try {
            const album = await AlbumService.basicGetOne(id);

            if (!album) {
                const error = new BadRequestError('Coundn\'t found this ID', 400)
                next(error)
            }else{
                if(!album.relativePath){
                    const error = new BadRequestError('Coundn\'t found path of this album', 404)
                    next(error)
                }
            }

            //Gán Album Name vào req.query.name để nếu có file upload lên thì file middleware sử dụng để làm thư mục cho file
            req.customParams = {}
            req.customParams.relativePath = album.relativePath;
            req.query.name = album.name;

            await multipleUploadMiddleware(req, res);
            const body = req.body;

            console.log(req.body);
            const files = req.files;
            let objAlbum = {}
            if(body.name){
                objAlbum.name = body.name,
                objAlbum.route = replaceToVietnamese(body.name)
            }

            if(body.description){
                objAlbum.description = body.description;
            }

            if(body.filesWillRemove){
                objAlbum.filesWillRemove = JSON.parse(body.filesWillRemove);

            }
            if(files && files.length){
                objAlbum.newFiles = [];
                const parseIntIsMain = parseInt(body.isMain) | 0;
                let isMain = parseIntIsMain > files.length-1 ? 0 : parseIntIsMain;
                for(let [index, file] of files.entries()){
                    let objMediaPath = {
                        relativeUrl: '',
                        relativeUrlThumbnail: ''
                    }
                    if(file.mimetype.split('/')[0] === 'image'){
                        let imageAfterResizing = await proccessImage.resize(file.path);
                        imageAfterResizing = imageAfterResizing.replace(/\\/g,"/");
                        let buffer = await proccessImage.thumbnail(imageAfterResizing);
                        let absoluteUrlThumbnail = writeBufferToFile.thumbnail(imageAfterResizing, buffer).replace(/\\/g,"/");
                        objMediaPath.relativeUrl = imageAfterResizing.replace(localPathConfig.album, '');
                        objMediaPath.relativeUrlThumbnail = absoluteUrlThumbnail.replace(localPathConfig.album, '');    
                    }else{
                        const absoluteUrlThumbnail = await processVideo(file.destination, file.filename);
                        objMediaPath.relativeUrlThumbnail = absoluteUrlThumbnail.replace(localPathConfig.album, '')
                        objMediaPath.relativeUrl = file.path.replace(/\\/g,"/").replace(localPathConfig.album, '');
                    }

                    let objMedia = {
                        type: file.mimetype.split('/')[0],
                        url: objMediaPath.relativeUrl,
                        thumbnailUrl: objMediaPath.relativeUrlThumbnail,
                        name: file.filename,
                        description: '',
                        caption: '',
                        alternateName: '',
                        isMain: index === isMain ? true : false
                    }

                    objAlbum.newFiles.push(objMedia);
                }
                objAlbum.thumbnail = objAlbum.newFiles[isMain].thumbnailUrl;
            }

            new CREATED({
                message: 'This album is updated!',
                metaData: await AlbumService.modify(id, objAlbum)
            }).send(res);
        

        } catch (err) {
            console.log(err);
            const error = new BadRequestError(err.message, 500)
            next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            const id = req.params.id;
            return res.status(200).json(await AlbumService.remove());
        } catch (err) {
            const error = new BadRequestError(err.message, 500)
            next(error)
        }
    }
}

module.exports = new AlbumController();