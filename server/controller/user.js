const express = require("express");
const User = require("../models/users");

const router = express.Router();
const { hashPassword } = require("../utils/password");

// To add User
const addUser = async (req, res) => {
    try {
        const { username, contactemail, password } = req.body.user;
        const hashedPassword = await hashPassword(password);
        console.log("hashed password for adding new user: ", hashedPassword);

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

const matchPassword = async (req, red) => {
    const {username, password} = req.body.data;
    let existingPassword = "";
    try {
        let existingUser = await User.findOne({ username: username });
        if (existingUser) {
            existingPassword = existingUser.password;
        }
        if (existingPassword === password) {
            res.status(200).json(True);
        } else {
            return res.status(404).json({message: "Password doesn't match"});
        }
    } catch (e) {
        res.status(500).json({ message: "Internal server error", error: e.toString() });
    }

}

router.post('/addUser', addUser);
router.get('/getSavedQuestions/:email', getSavedQuestions);
router.get('/getUserById/:uid', getUserById);
router.get('/getUserByEmail/:email', getUserByEmail);
router.put('/editUser', editUser);
router.post('/matchPassword', matchPassword);

module.exports = router;