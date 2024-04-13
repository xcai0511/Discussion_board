const express = require("express");
const Question = require("../models/questions");
// const Answer = require("../models/answers");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../utils/question');

const router = express.Router();

// To get Questions by Filter
const getQuestionsByFilter = async (req, res) => {
    try {
        const {order, search} = req.query;
        let questions;
        if (order) {
            questions = await getQuestionsByOrder(order);
        } else {
            questions = await Question.find().populate('tags');
        }
        if (search) {
            questions = await filterQuestionsBySearch(questions, search);
        }
        res.json(questions);
    } catch (e) {
        console.error("Error getting questions by filter: ", e);
        res.status(500).json({message: e.message});
    }

};

// To get Questions by Id
const getQuestionById = async (req, res) => {
    try {
        const id = req.params.qid;
        console.log("get question by id, id: ", id);
        const updatedQuestion = await Question.findOneAndUpdate(
            { _id: id },
            { $inc: { views: 1 } },
            { new: true }
        ).populate({
            path: 'answers',
            options: {sort: {'ans_date_time': -1}}
        });
        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        // const answers = await Answer.find({_id: {$in: updatedQuestion.answers}}).sort({ans_date_time: -1});
        // const response = {
        //     ...updatedQuestion.toObject(),
        //     answers: answers
        // };
        res.json(updatedQuestion);
        //res.json(updatedQuestion);
    } catch (e) {
        console.error(e);
        res.status(200).json({message: "error while getting question by id"});
    }
};

// To add Question
const addQuestion = async (req, res) => {
    try {
        const { title, text, tags, asked_by, ask_date_time } = req.body;
        const tagIds = await Promise.all(tags.map(async tname => await addTag(tname)));
        const savedQuestion = await Question.create({
            title: title,
            text: text,
            asked_by: asked_by,
            ask_date_time: ask_date_time,
            tags: tagIds
        })
        res.status(200).json(savedQuestion);
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Error saving the question', error: e.toString() });
    }
};

// add appropriate HTTP verbs and their endpoints to the router
router.get('/getQuestion', getQuestionsByFilter);
router.get('/getQuestionById/:qid', getQuestionById);
router.post('/addQuestion', addQuestion);

module.exports = router;