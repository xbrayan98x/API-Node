const {
    check
} = require('express-validator');

const { validateResult } = require('../utils/validator');

const validateCreate = [

    check('name').exists().not().isEmpty(),
    check('email').exists().isEmail(),
    check('password').exists().not().isEmpty(),
    check('rol').exists(),
    ( req , res, next ) => {
        validateResult(req , res, next)
    }
]

const validateLogin = [

    check('email').exists().isEmail(),
    check('password').exists().not().isEmpty(),
    ( req , res, next ) => {
        validateResult(req , res, next)
    }
]

module.exports = {
    validateCreate,
    validateLogin
}