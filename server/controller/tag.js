const express = require("express");
const Tag = require("../models/tags");
const Question = require("../models/questions");

const router = express.Router();

const getTagsWithQuestionNumber = async (req, res) => {
    try {
        const tags = await Tag.find();
        console.log("tags: ", tags);
        if (tags[0]._id) {
            const tagQuestionCounts = new Map(tags.map(tag => [tag._id.toString(), 0]));

            const questions = await Question.find().populate('tags');
            questions.forEach(question => {
                question.tags.forEach(tag => {
                    tagQuestionCounts.set(tag._id.toString(), (tagQuestionCounts.get(tag._id.toString()) || 0) + 1);
                });
            });

            const tagsWithCounts = Array.from(tagQuestionCounts.keys()).map(tagId => ({
                name: tags.find(tag => tag._id.toString() === tagId).name,
                qcnt: tagQuestionCounts.get(tagId)
            }));

            res.json(tagsWithCounts);
        } else {
            const questions = await Question.find().populate('tags');
            let tagCounts = {};
            questions.forEach(question => {
                question.tags.forEach(tag => {
                    if (tag.name in tagCounts) {
                        tagCounts[tag.name] += 1;
                    } else {
                        tagCounts[tag.name] = 1;
                    }
                });
            });
            const tagsWithCounts = Object.keys(tagCounts).map(tagName => ({
                name: tagName,
                qcnt: tagCounts[tagName]
            }));
            res.json(tagsWithCounts);
        }

    } catch (e) {
        console.error("Error getting tags with question number:", e);
        res.status(500).send({ message: "Internal server error" });
    }
};

// add appropriate HTTP verbs and their endpoints to the router.
router.get('/getTagsWithQuestionNumber', getTagsWithQuestionNumber);
module.exports = router;