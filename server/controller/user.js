const express = require("express");
const User = require("../models/users");

const router = express.Router();
const { hashPassword, verifyPassword } = require("../utils/password");
const { csrfProtection } = require("../auth-server");

// To add User
const addUser = async (req, res) => {
    try {
        const { username, contactemail, password } = req.body.user;
        const hashedPassword = await hashPassword(password);

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
            password: hashedPassword,
            saved_questions: []
        });

        const savedUser = await newUser.save();

        // Return the saved user
        res.status(201).json(savedUser);

    } catch (e) {
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
// To get user's saved questions
const getSavedQuestions = async (req, res) => {
    const email = req.params.email;
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

const updatePassword = async (req, res) => {
    const {username, oldPassword, newPassword} = req.body;
    try {
        let user = await User.findOne({ username: username });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        const isMatch = await verifyPassword(oldPassword, user.password);
        if (isMatch) {
            // Hash the new password before saving it
            const hashedNewPassword = await hashPassword(newPassword);
            user.password = hashedNewPassword; // Update the user's password with the new hashed password
            await user.save(); // Save the updated user object
            res.json({ success: true, message: 'Password updated successfully' });
        } else {
            res.json({ success: false, message: 'Invalid current password' });
        }
    } catch (e) {
        res.status(500).json({ message: "Internal server error", error: e.toString() });
    }
}

// To add/remove saved question from user
const saveQuestionToUser = async (req, res) => {

    const { isBookmarked, qid } = req.body.data;
    const { username } = req.params;

    const questionId = qid.toString();

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (isBookmarked) {
            user.saved_questions.push(questionId);
        } else {
            user.saved_questions = user.saved_questions.filter(id => id.toString() !== questionId);
        }

        await user.save();
        res.status(200).json({ message: "Question saved/removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// To update user profile image
const updateUserProfileImage = async (req, res) => {
    const { username, profileImage } = req.body;
    try {
        // Find the user by username and update the profileImage field
        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { profileImage: profileImage },
            { new: true }
        );
        res.json({ success: true, message: 'Profile image updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).send({ message: "Internal server error" });
    }
};

router.post('/addUser', addUser);
router.get('/getSavedQuestions/:email', csrfProtection, getSavedQuestions);
router.get('/getUserById/:uid', getUserById);
router.get('/getUserByEmail/:email', getUserByEmail);
router.put('/updatePassword', csrfProtection, updatePassword);
router.put('/saveQuestionToUser/:username', csrfProtection, saveQuestionToUser);
router.put('/updateUserProfileImage', csrfProtection, updateUserProfileImage);
router.get('/getAllUsers', getAllUsers);

module.exports = router;