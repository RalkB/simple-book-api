'use strict'

const express = require('express');
const router = express.Router();
const schemaValidator = require('../helpers/schema-validator');
const authorController = require('../controllers/author-controller');
const authorSchema = require('../schema/author');
const userValidator = require('../helpers/user-validator');

router.get('/author',
    (req, res, next) => authorController.get(req, res, next)
);
router.get('/author/:id',
    (req, res, next) => authorController.getById(req, res, next)
);
router.post('/author',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, authorSchema.post),
    (req, res, next) => authorController.post(req, res, next)
);
router.post('/author/bulk',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, authorSchema.bulkPost),
    (req, res, next) => authorController.bulkPost(req, res, next)
);
router.put('/author/:id',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, authorSchema.put),
    (req, res, next) => authorController.put(req, res, next)
);
router.delete('/author/:id',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => authorController.delete(req, res, next)
);



module.exports =  router;