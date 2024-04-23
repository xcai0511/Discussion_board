const mongoose = require("mongoose");
const {Schema} = require("mongoose");

module.exports = mongoose.Schema(
    {
        title: {type: String, required: true},
        text: {type: String, required: true},
        tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],
        asked_by: {type: String},
        ask_date_time: {type: Date, default: Date.now},
        views: {type: Number, default: 0},
        answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
        votes: {type: Number, default: 0},
        score: {type: Number, default: 0},
    },

    { collection: "Question" }
);