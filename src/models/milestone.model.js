'use strict'

const mongoose = require('mongoose');

const coordinates = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
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
    coordinates: coordinates
}, {
    timestamps: true,
    collection: 'milestone'
});

//Export the model
module.exports = mongoose.model('schema_milestone', milestoneSchema);