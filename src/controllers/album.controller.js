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

class AlbumController{
    create = async(req, res, next)=>{
        const query = req.query;
        try {
            if(!query || !query.name){
                return res.status(400).json({message: 'Missing parameter'})
            }else{
                await multipleUploadMiddleware(req, res);
                const files = req.files;
                if (!files || !files.length) {
                    return res.status(400).json({message: 'Missing parameter'})
                }else{
                    let objAlbum = {
                        name: query.name,
                        route: replaceToVietnamese(query.name),
                        thumbnail: null,
                        description: req.body.description,
                        media: []
                    }
                    const parseIntIsMain = parseInt(req.body.isMain) | 0;
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
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }

    getAll = async(req, res, next)=>{
        const query = req.query;
        let page = parseInt(query.page) || 1;
        let size = parseInt(query.size) || 10;
        try { 
            new OK({
                message: 'success',
                metaData: await AlbumService.getAll(page, size)
            }).send(res);
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }

    getDetail = async(req, res, next)=>{
        try {
            const route = req.params.route;
            new OK({
                message: 'success',
                metaData: await AlbumService.getDetail(route)
            }).send(res);
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }

    replace = async(req, res, next)=>{
        try {
            req.params.id
            return res.status(200).json(await AlbumService.replace());
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }

    modify = async(req, res, next)=>{
        try {
            req.params.id
            return res.status(200).json(await AlbumService.modify());
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }

    delete = async(req, res, next)=>{
        try {
            req.params.id
            return res.status(200).json(await AlbumService.remove());
        } catch (err) {
            const error = new BadRequestError(err.message, 400)
            next(error)
        }
    }
}

module.exports = new AlbumController();