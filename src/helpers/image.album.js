const fse = require('fs-extra');

const albumModel = require('../models/album.model');
const localPathConfig = require('../configs/local_dir');

const replaceToVietnamese = require('./replace.to.vietnamese');

async function checkExistAlbum(name){
    let condition = { route: replaceToVietnamese(name) }
    return await albumModel.countDocuments(condition);
}

async function refreshMain(id, mainIndex){
    let condition = { _id: id };
    const albumModel = await albumModel.model.albumModel.findOne(condition);
    if(albumModel && (mainIndex <= albumModel.media.length)){
        let mainMedia;
        for(const [index, media] of albumModel.media.entries()){
            if(mainIndex === index){
                media.isMain = true;
                mainMedia = media;
            }else{
                media.isMain = false;
            }
        }
        let thumbnail = mainMedia.srcThumbnail;
        return await albumModel.model.albumModel.findOneAndUpdate(
            condition,
            {
                $set: {
                    thumbnail,
                    media: albumModel.media
                }
            },
            { new: true }
        )
    }

    return albumModel;
}

function removeImage(media){
    for(let image of media){
        removeFile(image);
    }
}

function removeFile(image){
    let srcUrl = localPathConfig.gallery+'/'+image.src;
    let srcThumbnailUrl = localPathConfig.gallery+'/'+image.srcThumbnail;
    let existsSrc = fse.existsSync(srcUrl);
    let existsSrcThumbnail = fse.existsSync(srcThumbnailUrl);

    if(existsSrc){
        fse.removeSync(srcUrl);
    }

    if(existsSrcThumbnail){
        fse.removeSync(srcThumbnailUrl);
    }
}

module.exports = {
    checkExistAlbum,
    refreshMain,
    removeImage
}