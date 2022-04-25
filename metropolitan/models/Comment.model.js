const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        text: {
            type: String,
        },
        owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        rating: {
            type: Number,
        },
        state: {
            type: String,
            enum: ["APPROVED", "PENDANT", "REJECTED"],
            default: "PENDANT",
        },
    },
    {
        timestamps: true,
    }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
