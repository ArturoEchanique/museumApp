const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const commentSchema = new Schema(
    {
        text: {
            type: String,
        },
        commentAuthor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        rating: {
            type: Number,
        },
        state: {
            type: String,
            enum: ["APROVED", "PENDANT", "REJECTED"],
            default: "PENDANT",
        },
    },

    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
