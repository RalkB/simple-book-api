'use strict'

const Joi = require('joi');

const bookValidation = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string(),
    author: Joi.string().min(1).required(),
    release_date: Joi.date().required()
});

module.exports = {
    bulkPost: Joi.array().items(bookValidation).min(1).required(),
    post: bookValidation,
    put: bookValidation
}

