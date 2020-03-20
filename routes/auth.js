const express = require('express');
const {check, body} = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login',
    [
        body('email', 'Please enter valid emil')
            .isEmail()
            .normalizeEmail(),
        body('password', 'Invalid login credentials')
            .isAlphanumeric()
            .isLength({min: 5})
            .trim()
    ],
     authController.postLogin);

router.post(
    '/signup', 
    [
    body('email', 'Please enter valid email')
        .isEmail()
        .normalizeEmail()
        .custom((value, {req}) => {
            return User.findOne({ email: value })
                .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail exists already, please choose another one');
                }
            });
        }),
        body('password', 'Please enter valid password')
            .isLength({min: 5})
            .isAlphanumeric()
            .trim(),
        body('confirmPassword').custom((value, {req}) => {
            if(value !== req.body.password) {
                throw new Error('passwords have to match');
            }
            return true;
        })
    ],
    authController.postSignup);

router.post('/logout', check(), authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', check(), authController.postNewPassword);

module.exports = router;
