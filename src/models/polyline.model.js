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
})

const lolylinesSchema = new mongoose.Schema({
    polylines: {
        type: [[coordinates] || String]
    }
}, {
    timestamps: true,
    collection: 'polylines'
});

//Export the model
module.exports = mongoose.model('schema_polylines', lolylinesSchema);