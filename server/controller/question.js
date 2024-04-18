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
        res.json(updatedQuestion);
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

// To upvote a question
const upvoteQuestion = async (req, res) => {
    const { questionId } = req.params;
    const { userId } = req.body;

    try {
        // Find the question by ID
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the user has already upvoted the question
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.upvoted_questions.includes(questionId)) {
            return res.status(400).json({ message: "You have already upvoted this question" });
        }

        // Add the question ID to the user's upvoted_questions array
        user.upvoted_questions.push(questionId);
        await user.save();

        // Update the vote count and score
        question.votes += 1;
        question.score += 1;

        // Save the updated question
        await question.save();

        res.status(200).json({ message: "Question upvoted successfully" });
    } catch (error) {
        console.error("Error upvoting question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// To downvote a question
const downvoteQuestion = async (req, res) => {
    const { questionId } = req.params;
    const { userId } = req.body;

    try {
        // Find the question by ID
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the user has already downvoted the question
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.downvoted_questions.includes(questionId)) {
            return res.status(400).json({ message: "You have already downvoted this question" });
        }

        // Add the question ID to the user's downvoted_questions array
        user.downvoted_questions.push(questionId);
        await user.save();

        // Update the vote count and score
        question.votes -= 1;
        question.score -= 1;

        // Save the updated question
        await question.save();

        res.status(200).json({ message: "Question downvoted successfully" });
    } catch (error) {
        console.error("Error downvoting question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// To remove a vote from a question
const removeVote = async (req, res) => {
    const { questionId } = req.params;
    const { userId } = req.body;

    try {
        // Find the question by ID
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user has upvoted or downvoted the question
        const upvotedIndex = user.upvoted_questions.indexOf(questionId);
        const downvotedIndex = user.downvoted_questions.indexOf(questionId);

        if (upvotedIndex !== -1) {
            // Remove the upvote
            user.upvoted_questions.splice(upvotedIndex, 1);
            question.votes -= 1;
            question.score -= 1;
        } else if (downvotedIndex !== -1) {
            // Remove the downvote
            user.downvoted_questions.splice(downvotedIndex, 1);
            question.votes += 1;
            question.score += 1;
        } else {
            // If the user hasn't voted, return without making any changes
            return res.status(200).json({ message: "No vote to remove" });
        }

        await user.save();
        await question.save();

        res.status(200).json({ message: "Vote removed successfully" });
    } catch (error) {
        console.error("Error removing vote:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// To switch a vote
const switchVote = async (req, res) => {
    const { questionId } = req.params;
    const { userId } = req.body;

    try {
        // Find the question by ID
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user has already upvoted or downvoted the question
        const upvotedIndex = user.upvoted_questions.indexOf(questionId);
        const downvotedIndex = user.downvoted_questions.indexOf(questionId);

        if (upvotedIndex !== -1) {
            // Remove the upvote
            user.upvoted_questions.splice(upvotedIndex, 1);
            question.votes -= 1;
            question.score -= 1;
        } else if (downvotedIndex !== -1) {
            // Remove the downvote
            user.downvoted_questions.splice(downvotedIndex, 1);
            question.votes += 1;
            question.score += 1;
        } else {
            // If the user hasn't voted yet, return without making any changes
            return res.status(200).json({ message: "No vote to switch" });
        }

        await user.save();
        await question.save();

        res.status(200).json({ message: "Vote switched successfully" });
    } catch (error) {
        console.error("Error switching vote:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// add appropriate HTTP verbs and their endpoints to the router
router.get('/getQuestion', getQuestionsByFilter);
router.get('/getQuestionById/:qid', getQuestionById);
router.post('/addQuestion', csrfProtection, addQuestion);
router.delete('/deleteQuestionById/:qid', deleteQuestionById);
router.put('/upvoteQuestion/:questionId', csrfProtection, upvoteQuestion);
router.put('/downvoteQuestion/:questionId', csrfProtection, downvoteQuestion);
router.put('/removeVote/:questionId', csrfProtection, removeVote);
router.put('/switchVote/:questionId', csrfProtection, switchVote);

module.exports = router;