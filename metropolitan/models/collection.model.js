const { Schema, model } = require("mongoose");


const collectionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        bgImage: {
            type: String,
        },
        params: {
            type: ['String'],
            required: true,
        },
        artItemsList: [{ type: Schema.Types.ObjectId, ref: 'ArtItem' }],
    },
    {
        timestamps: true
    }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
