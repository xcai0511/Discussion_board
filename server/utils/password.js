const bcrypt = require('bcrypt');
const saltRounds = 10;

// For password protection
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error("Error hashing password:", error);
    }
}

async function verifyPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error("Error verifying password:", error);
        return false;
    }
}

module.exports = { hashPassword, verifyPassword };