const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Indicate an name']
    },
}, {
    timestamps: true,
});

const Artist = model("Artist", artistSchema);

module.exports = Artist;