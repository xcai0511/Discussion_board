const express = require("express");
const Tag = require("../models/tags");
const Question = require("../models/questions");

const router = express.Router();

const getTagsWithQuestionNumber = async (req, res) => {
    try {
        const tags = await Tag.find();
        const questions = await Question.find().populate('tags');

        let tagQuestionCounts = {};

        if (!tags.length) {
            return res.json([]);
        }

        // Initialize tag counts
        tags.forEach(tag => tagQuestionCounts[tag._id.toString()] = 0);

        // Accumulate counts for each tag found in questions
        questions.forEach(question => {
            question.tags.forEach(tag => {
                tagQuestionCounts[tag._id.toString()] = (tagQuestionCounts[tag._id.toString()] || 0) + 1;
            });
        });

        // Create a response array with tag names and counts
        const tagsWithCounts = tags.map(tag => ({
            name: tag.name,
            qcnt: tagQuestionCounts[tag._id.toString()]
        }));

        res.json(tagsWithCounts);
    } catch (error) {
        console.error("Error getting tags with question number:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

// add appropriate HTTP verbs and their endpoints to the router.
router.get('/getTagsWithQuestionNumber', getTagsWithQuestionNumber);
module.exports = router;