const express = require("express");
const User = require("../models/users");

const router = express.Router();

// To add User
const addUser = async (req, res) => {
    try {
        const { username, contactemail, password } = req.body.user;

        // Check if a user with the same email already exists
        let existingUser = await User.findOne({ contactemail: contactemail });
        if (existingUser) {
            // If the user exists, return an error message
            return res.status(409).json({ message: 'Email already in use' });
        }
        // If no existing user, create a new user
        const newUser = new User({
            username,
            contactemail,
            password,
            saved_questions: []
        });

        const savedUser = await newUser.save();
        console.log('Saved user:', savedUser);

        // Return the saved user
        res.status(201).json(savedUser);

    } catch (e) {
        console.error("Error adding user:", e);
        res.status(500).json({ message: 'Error adding user', error: e.toString() });
    }
};

// To get user by ID
const getUserById = async (req, res) => {
    const userId = req.params.uid;

    try {
        // Retrieve user from the database by ID
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.toString() });
    }
};

// To get user by email
const getUserByEmail = async (req, res) => {
    const userEmail = req.params.email;

    try {
        // Retrieve user from the database by email
        const user = await User.findOne({ contactemail: userEmail });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.toString() });
    }
};

// TODO: Edit User
const editUser = async (req, res) => {
    return;
}

// To get user's saved questions
const getSavedQuestions = async (req, res) => {
    const email = req.params.email;
    console.log("getsavedquestions ===> ", email);
    try {
        // Find the user by email and populate the saved_questions array
        const user = await User.findOne({ contactemail: email })
            .populate({
                path: 'saved_questions',
                populate: {
                    path: 'tags',
                    model: 'Tag'
                }
            });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const savedQuestions = user.saved_questions;

        res.status(200).json(savedQuestions);
    } catch (e) {
        res.status(500).json({ message: "Internal server error", error: e.toString() });
    }
}

// To add/remove saved question from user
const saveQuestionToUser = async (req, res) => {

    const { isBookmarked } = req.body;
    console.log("save question to user controller =====", req.body);

    const { username } = req.params;
    console.log("save question to user controller, req.params", req.params);

    const questionId = req.body.qid.toString();

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (isBookmarked) {
            user.saved_questions.push(questionId);
            console.log("Question ID being pushed is ===== ", questionId);
        } else {
            user.saved_questions = user.saved_questions.filter(id => id.toString() !== questionId);
            console.log("Question ID being removed from saved posts is ===== ", questionId);
        }

        await user.save();

        res.status(200).json({ message: "Question saved/removed successfully" });
    } catch (error) {
        console.error("Error saving/removing question:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

router.post('/addUser', addUser);
router.get('/getSavedQuestions/:email', getSavedQuestions);
router.get('/getUserById/:uid', getUserById);
router.get('/getUserByEmail/:email', getUserByEmail);
router.put('/editUser', editUser);
router.put('/saveQuestionToUser/:username', saveQuestionToUser);

module.exports = router;