"use strict";

const fse = require('fs-extra');
const cliProgress = require('cli-progress');

// create a new progress bar instance and use shades_classic theme
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
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
    // start the progress bar with a total value of 200 and start value of 0
    bar.start(100, 0);
    return new Promise((resolve, reject)=>{
        const path = videoPath+'/'+fileName;
        const destination = videoPath+'/'+fileName.split('.')[0]+'.webm';

        const outputWebmOption = ['-f', 'webm','-c:v', 'libvpx-vp9', '-b:v', '1M', '-acodec', 'libvorbis'];
        const outputMp4Option = ['-f', 'mp4', '-c:v', 'libx265'];
        ffmpeg(path)
            .output(destination)
            .outputOptions(
                outputWebmOption
            ).on('progress', (progress)=>{
                // update the current value in your application..
                bar.update(progress.percent);
            })
            .on('end', function (res) {
                console.log(res);
                resolve(destination);
                fse.unlinkSync(path);
                // stop the progress bar
                bar.stop();
            })
            .on('error', (error)=>{
                console.log(error);
                reject(error)
                // stop the progress bar
                bar.stop();
            }).run();
    })
}

module.exports = {
    generateThumbnail,
    convert
}