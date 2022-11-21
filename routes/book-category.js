'use strict'

const express = require('express');
const router = express.Router();
const schemaValidator = require('../helpers/schema-validator');
const schema = require('../schema/book-category');
const bookCategoryController = require('../controllers/book-category-controller');
const userValidator = require('../helpers/user-validator');

router.get('/book-categories',
    (req, res, next) => bookCategoryController.get(req, res, next)
);
router.get('/book-categories/:id',
    (req, res, next) => bookCategoryController.getById(req, res, next)
);
router.get('/book-categories/book/:id',
    (req, res, next) => bookCategoryController.getByCategoryId(req, res, next)
);
router.get('/book-categories/category/:id',
    (req, res, next) => bookCategoryController.getByBookId(req, res, next)
);
router.post('/book-categories',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, schema.post),
    (req, res, next) => bookCategoryController.post(req, res, next)
);
router.post('/book-categories/bulk',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, schema.bulkPost),
    (req, res, next) => bookCategoryController.bulkPost(req, res, next)
);
router.put('/book-categories/:bookId/:categoryId',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, schema.put),
    (req, res, next) => bookCategoryController.put(req, res, next)
);
router.delete('/book-categories/:id',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => bookCategoryController.delete(req, res, next)
);

module.exports =  router;