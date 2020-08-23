const mongoose = require("mongoose");
const Types = mongoose.Schema.Types;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, // not hased for simplicity sake
    user_type: {
        type: String,
        enum: ["Reviewer", "Organizer"],
    },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
