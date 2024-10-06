const {check} = require("express-validator");

// User registration validation
exports.validateRegister = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required and should be at least 6 characters').isLength({ min: 6 }),
    check('username', 'Username is required').not().isEmpty(),
];

// User login validation
exports.validateLogin = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
];