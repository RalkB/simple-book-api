'use strict'

const Joi = require('joi');

const signUpValidation = Joi.object({
    username: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
});

const signInValidation = Joi.object({
    login: Joi.string().min(1).required(),
    password: Joi.string().min(1).required()
});

module.exports = {
    singUp: signUpValidation,
    signIn: signInValidation
}

