const express = require("express");
const Question = require("../models/questions");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../utils/question');
const { csrfProtection } = require("../auth-server");
const User = require("../models/users");

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
        res.json(updatedQuestion);
    } catch (e) {
        console.error('Error in getQuestionById controller:', e);
        res.status(500).json({message: "error while getting question by id"});
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

// To delete a question by ID
const deleteQuestionById = async (req, res) => {
    try {
        const id = req.params.qid;
        
        // Find and delete the question by its ID
        const deletedQuestion = await Question.findByIdAndDelete(id);

        // Check if the question was found and deleted
        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        // If the question was successfully deleted, send a success response
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (e) {
        console.error("Error deleting question:", e);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateQuestionWithTag = async (req, res) => {
    const { qid, newTag }  = req.body
    try {
        // Add the new tag or retrieve its ID if it already exists
        const tagId = await addTag(newTag);

        const updatedQuestion = await Question.findByIdAndUpdate(
            qid,
            { $addToSet: { tags: tagId } }, // Use $addToSet to avoid duplicates
            { new: true } // Return the modified document
        ).populate('tags'); // Populate the 'tags' field

        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        return res.status(200).json(updatedQuestion);
    } catch (error) {
        console.error('Error updating question with tag:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const upvoteQuestion = async (req, res) => {
    const {uid} = req.body;
    const {qid} = req.params;
    try {
        const user = await User.findById(uid);
        const question = await Question.findById(qid);
        if (!user || !question) {
            return res.json({success: false, message: "User or question not found"});
        }
        // check if already upvoted
        if (!user.upvoted_questions.includes(qid)) {
            // adding upvote
            user.upvoted_questions.push(qid);
            question.votes += 1;
            question.score += 1;
            // if already downvoted, remove the downvote
            if (user.downvoted_questions.includes(qid)) {
                user.downvoted_questions.pull(qid);
                question.votes -= 1;
                question.score += 1;
            }
            await user.save();
            const updatedQuestion = await question.save();
            return res.json({success: true, message: "upvote success", updatedQuestion });
        } else {
            // removing upvote
            user.upvoted_questions.pull(qid);
            question.votes -= 1;
            question.score -= 1;
            await user.save();
            const updatedQuestion = await question.save();
            return res.json({success: true, message: "upvote removed", updatedQuestion});
        }
    } catch (e) {
        console.error("Error upvoting:", e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const downvoteQuestion = async (req, res) => {
    const {uid} = req.body;
    const {qid} = req.params;
    try {
        const user = await User.findById(uid);
        const question = await Question.findById(qid);
        if (!user || !question) {
            return res.json({success: false, message: "User or question not found"});
        }

        // check if already downvoted
        if (!user.downvoted_questions.includes(qid)) {
            // adding downvote
            user.downvoted_questions.push(qid);
            question.votes += 1;
            question.score -= 1;

            // if already upvoted, remove the upvote
            if (user.upvoted_questions.includes(qid)) {
                user.upvoted_questions.pull(qid);
                question.votes -= 1;
                question.score -= 1;
            }
            await user.save();
            const updatedQuestion = await question.save();

            return res.json({success: true, message: "downvote success", updatedQuestion });
        } else {
            // removing downvote
            user.downvoted_questions.pull(qid);
            question.votes -= 1;
            question.score += 1;
            await user.save();
            const updatedQuestion = await question.save();
            return res.json({success: true, message: "downvote removed", updatedQuestion });
        }
    } catch (e) {
        console.error("Error downvoting:", e);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// add appropriate HTTP verbs and their endpoints to the router
router.get('/getQuestion', getQuestionsByFilter);
router.get('/getQuestionById/:qid', getQuestionById);
router.post('/addQuestion', csrfProtection, addQuestion);
router.delete('/deleteQuestionById/:qid', deleteQuestionById);
router.put('/updateQuestionWithTag', csrfProtection, updateQuestionWithTag);
router.put('/upvote/:qid', csrfProtection, upvoteQuestion);
router.put('/downvote/:qid', csrfProtection, downvoteQuestion);

module.exports = router;