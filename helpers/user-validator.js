'use strict'

const jwt = require('jsonwebtoken');
require('dotenv').config();
const errors = require('./errors');

module.exports = (req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET_JWT);
        return next();
    } catch (err) {
        return errors.unauthorizedError(res);
    }
}