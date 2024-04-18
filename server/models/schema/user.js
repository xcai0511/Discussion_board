const mongoose = require("mongoose");
const {Schema} = require("mongoose");

module.exports = mongoose.Schema(
    {
        username: {type: String, required: true},
        contactemail: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profileImage: { type: String, default: "user-avatar-1.png" },
        saved_questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
        upvoted_questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
        downvoted_questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    },

    { collection: "User" }
);