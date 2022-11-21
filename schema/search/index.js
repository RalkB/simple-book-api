'use strict'

const Joi = require('joi');

const validation = Joi.object({
    id: Joi.number().allow(null),
    category: Joi.string().allow(null).allow(""),
    title: Joi.string().allow(null).allow(""),
    author: Joi.string().allow(null).allow(""), 
});

module.exports = {
    search: validation
}

