const { Schema, model } = require("mongoose");

const artGallerySchema = new Schema({

    name: {
        type: String,
        required: [true, 'A name is needed']
    },
    lat: {
        type: Number,
        required: [true, 'Coordinates are needed']
    },
    long: {
        type: Number,
        required: [true, 'Coordinates are needed']
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
})

const ArtGallery = model("ArtGallery", artGallerySchema);

module.exports = ArtGallery;