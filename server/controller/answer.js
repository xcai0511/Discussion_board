const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");

const router = express.Router();

// Adding answer
const addAnswer = async (req, res) => {
    console.log("add answer: ", req.body);
    try {
        const {qid, ans} = req.body;
        const savedAnswer = await Answer.create({
            text: ans.text,
            ans_by: ans.ans_by,
            ans_date_time: ans.ans_date_time
        })
        console.log("saved answer: ", savedAnswer);

        await Question.findOneAndUpdate(
            { _id: qid },
            { $push: { answers: { $each: [savedAnswer._id], $position: 0 } } },
            { new: true }
        );
        res.status(200).json(savedAnswer);
    } catch (e) {
        console.error("error adding answer: ", e);
        res.status(500).json({message: "error adding answer"});
    }
};

// add appropriate HTTP verbs and their endpoints to the router.
router.post('/addAnswer', addAnswer);
module.exports = router;