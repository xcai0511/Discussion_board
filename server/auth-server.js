// middleware setup file for csrf protection

const csrf = require('csurf');

//const app = express();

// CSRF protection middleware setup
//const csrfProtection = csrf(({cookie: true}));
const csrfProtection = csrf({ cookie: false, session: true });

module.exports = { csrfProtection };
