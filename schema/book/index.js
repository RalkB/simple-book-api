'use strict'

const Joi = require('joi');

const bookValidation = Joi.object({
    title: Joi.string().min(1).required(),
    description: Joi.string(),
    authors: Joi.array().items(Joi.number().min(1)).min(1).required(),
    release_date: Joi.date().required()
});

module.exports = {
    post: bookValidation,
    put: bookValidation
}

