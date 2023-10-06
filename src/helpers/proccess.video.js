"use strict";

const
    ffmpegPath = require("@ffmpeg-installer/ffmpeg").path,
    ffprobePath = require("@ffprobe-installer/ffprobe").path,
    ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

function generateThumbnail(videoPath, fileName) {
    return new Promise((resolve, reject)=>{
        const path = videoPath+'/'+fileName;
        const thumbnailName = fileName.split('.')[0]+'-thumbnail.png';
        const destination = videoPath+'/'+thumbnailName;
        ffmpeg(path)
            .thumbnail({
                timestamps: ['50%'],
                filename: thumbnailName,
                size: '1920x1080',
                folder: videoPath
            })
            .on('end', function (res) {
                resolve(destination)
            })
            .on('error', (error)=>{
                reject(error)
            });
    })
        
}

module.exports = generateThumbnail;

// generateThumbnail('./output', 'Chỉ tình thương ở lại.mp4')
//     .then((res) => {
//         console.log('Screenshots taken');
//         console.log(res);
//     })
//     .catch((err) => console.error(err));