const mongoose = require("mongoose");

const enumType = ['image', 'video'];

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
        type: String
    },
    caption: {
        type: String
    },
    alternateName: {
        type: String
    },
    type: {
        type: String,
        enum: enumType,
        required: true
    }
}, {
    timestamps: true
});

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    route: {
        type: String,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    media: [{
        type: mediaSchema
    }],
    relativePath: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'album'
})

module.exports = mongoose.model("schema_album", albumSchema);