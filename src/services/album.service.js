'use strict'
const mongoose = require('mongoose');
const fse = require('fs-extra');
const localPathConfig = require('../configs/local_dir');
const albumModel = require('../models/album.model');

class AlbumService {
    static basicGetOne = async (id) => {
        const album = await albumModel.findById(id);
        return album;
    }

    static create = async (data) => {
        try {
            const album = new albumModel(data);
            await album.save();
            const conditional = { _id: album._id };
            const albumsAggregate = await albumModel.aggregate(
                [
                    {
                        $match: conditional
                    }, {
                        $addFields: {
                            mediaItems: { $sum: { $size: "$media" } }
                        }
                    }, {
                        $limit: 1
                    }
                ]
            ).then(res => {
                return res[0]
            });
            return albumsAggregate;
        } catch (error) {
            return error;
        }
    }

    static getAll = async (page, size) => {
        try {
            const countTotal = await albumModel.countDocuments({});
            const albumsAggregate = await albumModel.aggregate(
                [
                    {
                        $addFields: {
                            mediaItems: { $sum: { $size: "$media" } }
                        }
                    }, {
                        $project: {
                            media: 0
                        }
                    },
                ]
            );

            const metaData = {
                data: albumsAggregate,
                paging: {
                    totalItems: countTotal,
                    size: size,
                    page: page,
                    totalPages: Math.ceil(countTotal / size),
                }
            };
            return metaData;
        } catch (error) {
            return error;
        }
    }

    static getDetail = async (conditional) => {
        return await tranformToDetaiData(conditional);
    }

    static replace = async (id, data) => {
        try {
            const album = await albumModel.findByIdAndUpdate(id, data, { new: true });
            return album
        } catch (error) {
            return error;
        }
    }

    static modify = async (id, data) => {
        const updateQuery = { ...data };
        const arrPromise = [];

        if (data.newFiles?.length) {
            updateQuery.$push = {
                media: { $each: data.newFiles }
            }
        }
        const updateAlbum = albumModel.findByIdAndUpdate(id, updateQuery, { safe: true, new: true });
        arrPromise.push(updateAlbum);

        if (data.filesWillRemove?.length) {
            const removeValueQuery = {
                $pull: {
                    media: { _id: { $in: data.filesWillRemove } }
                }
            }
            const removeItem = albumModel.findByIdAndUpdate(id, removeValueQuery, { safe: true, new: true });
            arrPromise.push(removeItem);
        }
        await Promise.all(arrPromise);
        const conditional = { _id: new mongoose.Types.ObjectId(id) };
        const album = await tranformToDetaiData(conditional);
        return album;
    }

    static remove = async (id) => {
        try {
            const album = await albumModel.findByIdAndRemove(id);
            return album
        } catch (error) {
            return error;
        }
    }
}

const tranformToDetaiData = async(conditional)=>{
    return await albumModel.aggregate(
        [
            {
                $match: conditional
            }, {
                $addFields: {
                    mediaItems: { $sum: { $size: "$media" } }
                }
            }, {
                $limit: 1
            }
        ]
    ).then(res => {
        return res[0]
    });
}

module.exports = AlbumService;