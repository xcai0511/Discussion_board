const express = require("express");
const User = require("../models/users")
const router = express.Router();

const { verifyPassword } = require("../utils/password")
const { csrfProtection } = require("../auth-server");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({contactemail: email});
        if (user == null) {
            return res.json({success: false, message: "email"});
        }

        const isMatch = await verifyPassword(password, user.password);
        if (isMatch) {
            req.session.user = user;
            res.json({ success: true, user });
        } else {
            res.json({success: false, message: "password"});
        }
    } catch (e) {
        res.status(500).json({message: "error logging in"});
    }
}

const logout = async (req, res) => {
    if(req.session) {
        req.session.destroy();
        res.json({ success: true });
    }
    else {
        res.json({ success: false });
    }
}

const fetchCsrfToken = async (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
}


router.post('/login', csrfProtection, login);
router.post('/logout', csrfProtection, logout);
router.get('/csrf-token', csrfProtection, fetchCsrfToken);
module.exports = router;