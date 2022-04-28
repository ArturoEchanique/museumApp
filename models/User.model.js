const { Schema, model } = require("mongoose");

const userSchema = new Schema({

    username: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Indicate a password']
    },
    email: {
        type: String,
        required: [true, 'Indicate an email']
    },
    favoriteItems: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'ArtItem' 
    }],
    role: {
        type: String,
        enum: ["ADMIN", "MODERATOR", "USER"],
        default: "USER"
    },
    profileImg: {
        type: String,
        default: "https://painting-planet.com/images2/autorretrato-en-sombrero-de-fieltro-vincent-van_1.jpg",
    },
}, {
    timestamps: true,
});

const User = model("User", userSchema);

module.exports = User;