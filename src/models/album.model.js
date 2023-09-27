const mongoose = require("mongoose");

const enumType = ['IMG', 'VIDEO'];

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    alternateName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: enumType,
        required: true
    }
});

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    media: [{
        type: mediaSchema
    }]
})

module.exports = mongoose.model("AlbumImage", albumSchema);