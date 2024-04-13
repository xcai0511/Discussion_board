const express = require("express");
const User = require("../models/users");

const router = express.Router();

// To add User
const addUser = async (req, res) => {
    try {
        const { username, contactemail, password } = req.body.user;
        console.log(req.body);
        const savedUser = await User.create({
            username: username,
            contactemail: contactemail,
            password: password,
            saved_questions: []
        })
        console.log('saved user: ', savedUser);
        // console.log(req.body);
        // const {user} = req.body;
        // try {
        //     const savedUser = await User.create({
        //         username: user.username,
        //         contactemail: user.contactemail,
        //         password: user.password,
        //         saved_questions: user.saved_questions
        //     })
        //     console.log('saved user: ', savedUser);
        // } catch (e) {
        //     console.log('failed user.create');
        //     console.log(e);
        // }

        res.status(200).json(savedUser);
    } catch (e) {
        console.log("Went to catch");
        res.status(404).json({ message: 'Error adding user', error: e.toString() });
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
    const userId = req.params.uid;

    try {
        // Find the user by ID and populate the saved_questions array
        const user = await User.findById(userId).populate("saved_questions");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const savedQuestions = user.saved_questions;

        res.status(200).json(savedQuestions);
    } catch (e) {
        res.status(500).json({ message: "Internal server error", error: e.toString() });
    }
}

router.post('/addUser', addUser);
router.get('/getSavedQuestions/:uid', getSavedQuestions);
router.get('/getUserById/:uid', getUserById);
router.get('/getUserByEmail/:email', getUserByEmail);
router.put('/editUser', editUser);

module.exports = router;