'use strict'

const mongoose = require('mongoose');

const coordinates = new mongoose.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const milestoneSchema = new mongoose.Schema({
    numericalOrder: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true
    },
    coordinates: coordinates,
    albumId: {
        type: mongoose.Types.ObjectId,
        ref: 'schema_album',
        required: false,
        default: null
    }
}, {
    timestamps: true,
    collection: 'milestone'
});

//Export the model
module.exports = mongoose.model('schema_milestone', milestoneSchema);