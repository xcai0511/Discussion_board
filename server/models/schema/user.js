const mongoose = require("mongoose");
const {Schema} = require("mongoose");

module.exports = mongoose.Schema(
    {
        username: {type: String, required: true},
        contactemail: {type: String, required: true},
        password: {type: String, required: true},
        saved_questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    },

    { collection: "User" }
);