const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const artSchema = new Schema(
    {
        title: {
            type: String,
            // unique: true -> Ideally, should be unique, but its up to you
        },
        password: String,
        email: String,
        // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        favorites: [{ type: Schema.Types.ObjectId, ref: 'Art' }],
        username: {
            type: String,
            enum: ["ADMIN", "MODERATOR", "USER"],
            default: "USER"
        },
        profileImg: {
            type: String,
            default: "",
        },
    },

    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Art = model("Art", artSchema);

module.exports = Art;
