// middleware setup file for csrf protection

const csrf = require('csurf');

// CSRF protection middleware setup
//const csrfProtection = csrf({ cookie: false, session: true });
const csrfProtection = csrf();
module.exports = { csrfProtection };
