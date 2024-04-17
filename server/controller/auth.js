const express = require("express");
const User = require("../models/users")
const router = express.Router();

const { verifyPassword } = require("../utils/password")
const { csrfProtection } = require("../auth-server");

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("enter auth.js under server/controller", req.body);
    try {
        const user = await User.findOne({contactemail: email});
        console.log("LOGIN with user: ", user);
        console.log(user == null);
        console.log(user === null);
        if (user == null) {
            //res.status(404).json({success: false, message: "Email does not exist"});
            //console.log("can't find user")
            return res.json({success: false, message: "email"});
        }

        const isMatch = await verifyPassword(password, user.password);
        if (isMatch) {
            req.session.user = user;
            res.json({ success: true, user });
        } else {
            //res.status(401).json({ success: false, message: 'Password is incorrect' });
            //console.log("password doesn't match")
            res.json({success: false, message: "password"});
        }
    } catch (e) {
        console.error("error logging in: ", e);
        res.status(500).json({message: "error logging in"});
    }
}

const logout = async (req, res) => {
    req.session.destroy();
    res.json({ success: true });
}

// check login status
// const checkLoginStatus = async (req, res) => {
//     console.log("CHECK LOGIN STATUS CALLED");
//     try {
//         const user = req.session.user;
//         res.json({ loggedIn: !!user, user });
//     } catch (e) {
//         console.error("error checking login status: ", e);
//         res.status(500).json({message: "error checking login status"});
//     }
// }

const csrf = async (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
}


router.post('/login', csrfProtection, login);
router.post('/logout', csrfProtection, logout);
//router.get('/check-login', checkLoginStatus);
router.get('/csrf-token', csrfProtection, csrf);
module.exports = router;