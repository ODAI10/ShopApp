
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

//  Validate input product
const validateProduct = [
 body('name')
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3, max: 20 }).withMessage('Product name must be between 3 and 20 characters'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),

  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),

  body('description')
    .optional()
    .isLength({ min: 250, max: 500 }).withMessage('Description must be between 150 and 200 characters'),

  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category ID'),

  body('imageUrl')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),

  body('brand')
    .optional()
    .isLength({ min:5, max: 25 }).withMessage('Brand name can be up to 50 characters'),

  body('isFeatured')
    .optional()
    .isBoolean().withMessage('isFeatured must be true or false')
];


module.exports = { validateRegister,validateProduct };
