const { Schema, model } = require("mongoose");


const collectionSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Indicate a title']
        },
        description: {
            type: String,
        },
        bgImage: {
            type: String,
        },
        searchParams: {
            type: ['String'],
            required: [true, 'Indicate the search params']
        },
        artItemsList: [{
            type: Schema.Types.ObjectId,
            ref: 'ArtItem',
            default: [],
        }],
    },
    {
        timestamps: true
    }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
