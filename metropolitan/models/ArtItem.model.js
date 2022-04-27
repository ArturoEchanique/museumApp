const { Schema, model } = require("mongoose");

const artItemSchema = new Schema({
    apiId: {
        type: String,
        required: [true, 'ApiId is required']
    },
    likes: {
        type: Number,
        default: 0,
    },
    artGallery: {
        type: Schema.Types.ObjectId,
        ref: 'ArtGallery'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
}, {
    timestamps: true,
});

const ArtItem = model("ArtItem", artItemSchema);

module.exports = ArtItem;