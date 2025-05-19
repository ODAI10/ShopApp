
const { body } = require('express-validator');


// Validate user registration input
 const validateRegister = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

  body('phone')
    .isMobilePhone().withMessage('Invalid phone number')
    .isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 digits')
];

module.exports = { validateRegister };
