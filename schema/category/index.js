'use strict'

const Joi = require('joi');

const categoryValidation = Joi.object({
    name: Joi.string().min(1).required()
});

module.exports = {
    bulkPost: Joi.array().items(categoryValidation).min(1).required(),
    post: categoryValidation,
    put: categoryValidation
}

