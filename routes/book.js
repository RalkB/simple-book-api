'use strict'

const express = require('express');
const router = express.Router();
const schemaValidator = require('../helpers/schema-validator');
const bookController = require('../controllers/book-controller');
const bookSchema = require('../schema/book');

router.get('/book',
    (req, res, next) => bookController.get(req, res, next)
);
router.get('/book/:id',
    (req, res, next) => bookController.getById(req, res, next)
);
router.post('/book',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, bookSchema.post),
    (req, res, next) => bookController.post(req, res, next)
);
router.post('/book/bulk',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, bookSchema.bulkPost),
    (req, res, next) => bookController.bulkPost(req, res, next)
);
router.put('/book/:id',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, bookSchema.put),
    (req, res, next) => bookController.put(req, res, next)
);
router.delete('/book/:id',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => bookController.delete(req, res, next)
);



module.exports =  router;