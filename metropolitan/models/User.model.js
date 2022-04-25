const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    favoriteItems: [{ type: Schema.Types.ObjectId, ref: 'Art' }],
    role: {
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
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
