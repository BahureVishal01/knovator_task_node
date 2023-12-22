const { body } = require('express-validator');
//name , email userName, password

const validateRegistrationDetails = [
    body('name').trim().notEmpty().withMessage('Name is required'),

  body('email').isEmail().withMessage('Invalid email address').notEmpty().withMessage('Email is required'),

  body('userName').isAlphanumeric().withMessage('Username must be alphanumeric').notEmpty().withMessage('Username is required'),

  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long').notEmpty().withMessage('Password is required')
];

const validatePost = [
    body('title').trim().notEmpty().withMessage('Title is required'),

  body('body').trim().notEmpty().withMessage('Body is required'),

  body('geoLocation').not().isEmpty().withMessage('Geolocation is required'),

  body('userId').notEmpty().withMessage('User ID is required')
]
module.exports ={validateRegistrationDetails, validatePost} 