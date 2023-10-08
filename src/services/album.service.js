'use strict'

const albumModel = require('../models/album.model');

class AlbumService {
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
            ).then(res=>{
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

    static getDetail = async (route) => {
        try {
            const conditional = { route };
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
            ).then(res=>{
                return res[0]
            });

            const album = await albumModel.findOne(conditional);
            return albumsAggregate;
        } catch (error) {
            return error;
        }
    }

    static replace = async (id, data) => {
        try {

            const album = await albumModel.findOneAndReplace(id);
            return album
        } catch (error) {
            return error;
        }
    }

    static modify = async (id, data) => {
        try {
            const album = await albumModel.findOneAndUpdate(id);
            return album
        } catch (error) {
            return error;
        }
    }

    static remove = async (id, data) => {
        try {
            const album = await albumModel.findOneAndRemove(id);
            return album
        } catch (error) {
            return error;
        }
    }
}

module.exports = AlbumService;