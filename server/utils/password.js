const bcrypt = require('bcrypt');
const saltRounds = 10;

// For password protection
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (e) {
        throw (new Error(e.message));
    }
}

async function verifyPassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (e) {
        throw (new Error(e.message));
    }
}

module.exports = { hashPassword, verifyPassword };