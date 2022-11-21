'use strict'

const Joi = require('joi');

const validation = Joi.object({
    book_id: Joi.number().min(1).required(),
    author_id: Joi.number().min(1).required(),
});

module.exports = {
    post: validation,
    put: validation
}

