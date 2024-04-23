// Add configuration setting for your server to this file
require('dotenv').config();
//uncomment for MONGO_URL for docker
//const MONGO_URL = "mongodb://mongodb:27017/fake_so";
// config for local testing, that is, without docker.
//const MONGO_URL = "mongodb://mongodb:27017/fake_so";
const MONGO_URL = "mongodb://127.0.0.1:27017/fake_so";
const CLIENT_URL = "http://localhost:3000";
const port = 8000;
//const SESSION_SECRET = process.env.SESSION_SECRET || "default-session-secret";
const SESSION_SECRET = "default-session-secret";

module.exports = {
    MONGO_URL,
    CLIENT_URL,
    port,
    SESSION_SECRET
};
