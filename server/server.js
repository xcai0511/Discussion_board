// Application server

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// for user authentication using session
const session = require("express-session");
const csurf = require("csurf");

const { MONGO_URL, CLIENT_URL, port, SESSION_SECRET} = require("./config");

mongoose.connect(MONGO_URL);

const app = express();

app.get("/", (_, res) => {
    res.send("Fake SO Server Dummy Endpoint");
    res.end();
});

app.use(
    cors({
        credentials: true,
        origin: [CLIENT_URL],
    })
);

app.use(express.json());

// Session configuration
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto' }
}));

// CSRF protection
app.use(csurf({
    cookie: {
        httpOnly: true,
        secure: 'auto',
        sameSite: 'strict'
    }
}));

const questionController = require("./controller/question");
const tagController = require("./controller/tag");
const answerController = require("./controller/answer");
const userController = require("./controller/user");
const authController = require("./controller/auth")

app.use("/question", questionController);
app.use("/tag", tagController);
app.use("/answer", answerController);
app.use("/user", userController);
app.use("/auth", authController);

let server = app.listen(port, () => {
    console.log(`Server starts at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    server.close();
    mongoose.disconnect();
    console.log("Server closed. Database instance disconnected");
    process.exit(0);
});

module.exports = server
