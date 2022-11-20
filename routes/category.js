'use strict'

const express = require('express');
const router = express.Router();
const schemaValidator = require('../helpers/schema-validator');
const categoryController = require('../controllers/category-controller');
const categorySchema = require('../schema/category');
const userValidator = require('../helpers/user-validator');

router.get('/category',
    (req, res, next) => categoryController.get(req, res, next)
);
router.get('/category/:id',
    (req, res, next) => categoryController.getById(req, res, next)
);
router.post('/category',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, categorySchema.post),
    (req, res, next) => categoryController.post(req, res, next)
);
router.post('/category/bulk',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, categorySchema.bulkPost),
    (req, res, next) => categoryController.bulkPost(req, res, next)
);
router.put('/category/:id',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, categorySchema.put),
    (req, res, next) => categoryController.put(req, res, next)
);
router.delete('/category/:id',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => categoryController.delete(req, res, next)
);



module.exports =  router;