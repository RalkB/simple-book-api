'use strict'

const express = require('express');
const router = express.Router();
const schemaValidator = require('../helpers/schema-validator');
const schema = require('../schema/user');
const userController = require('../controllers/user-controller');
const userValidator = require('../helpers/user-validator');

router.post('/signin',
    (req, res, next) => schemaValidator(req, res, next, schema.signIn),
    (req, res, next) => userController.signIn(req, res, next)
);
router.post('/validate',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => res.json({status: true})
);
router.post('/signup',
    (req, res, next) => userValidator(req, res, next),
    (req, res, next) => schemaValidator(req, res, next, schema.singUp),
    (req, res, next) => userController.signUp(req, res, next)
);


module.exports = router;