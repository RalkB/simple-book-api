'use strict'

const Joi = require('joi');

const validation = Joi.object({
    name: Joi.string().min(1).required()
});

module.exports = {
    bulkPost: Joi.array().items(validation).min(1).required(),
    post: validation,
    put: validation
}

