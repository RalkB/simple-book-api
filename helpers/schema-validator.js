'use strict'

const errors = require('./errors');

module.exports = (req, res, next, schema) => {
    const { error } = schema.validate(req.body);

    if(!error) return next();

    errors.badRequestError(res, error);
}