'use strict'

const express = require('express');
const router = express.Router();
const schemaValidator = require('../helpers/schema-validator');
const bookAuthorController = require('../controllers/book-author-controller');
const schema = require('../schema/book-author');
const userValidator = require('../helpers/user-validator');

router.post('/book-author',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, schema.post),
    (req, res, next) => bookAuthorController.post(req, res, next)
);
router.put('/book-author/:bookId/:authorId',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, schema.put),
    (req, res, next) => bookAuthorController.put(req, res, next)
);
router.delete('/book-author/:id',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => bookAuthorController.delete(req, res, next)
);

module.exports =  router;