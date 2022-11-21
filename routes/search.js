'use strict'

const express = require('express');
const router = express.Router();
const schemaValidator = require('../helpers/schema-validator');
const searchController = require('../controllers/search-controller');
const schema = require('../schema/search');

router.post('/search',
    (req, res, next) => schemaValidator(req, res, next, schema.search),
    (req, res, next) => searchController.search(req, res, next)
);

module.exports = router;