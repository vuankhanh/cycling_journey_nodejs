"use strict";

const fse = require('fs-extra');

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
                size: '400x225',
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

function convert(videoPath, fileName){
    return new Promise((resolve, reject)=>{
        const path = videoPath+'/'+fileName;
        const destination = videoPath+'/'+fileName.split('.')[0]+'.webm';

        const outputWebmOption = ['-f', 'webm','-c:v', 'libvpx-vp9', '-b:v', '1M', '-acodec', 'libvorbis'];
        const outputMp4Option = ['-f', 'mp4', '-c:v', 'libx265'];
        ffmpeg(path)
            .output(destination)
            .outputOptions(
                outputWebmOption
            )
            .on('end', function (res) {
                console.log(res);
                resolve(destination);
                fse.unlinkSync(path);
            })
            .on('error', (error)=>{
                console.log(error);
                reject(error)
            }).run();
    })
}

module.exports = {
    generateThumbnail,
    convert
}