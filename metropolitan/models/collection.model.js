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
        //los parametros podrian estar pre harcodeados, ejemplo: isHighihgth: value, hasImage: value.
        params: {
            type: [String],
            required: true,
        },
        artList: [{ type: Schema.Types.ObjectId, ref: 'Art' }],
    },

    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Collection = model("Collection", collectionSchema);

module.exports = Collection;
