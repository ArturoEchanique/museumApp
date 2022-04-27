const { Schema, model } = require("mongoose");

const artGallerySchema = new Schema({
    name: {
        type: String,
    },
    lat: {
        type: Number
    },
    long: {
        type: Number
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
})

const ArtGallery = model("ArtGallery", artGallerySchema);

module.exports = ArtGallery;