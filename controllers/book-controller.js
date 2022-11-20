'use strict'

const errors = require('../helpers/errors');
const Book = require('../models').Book;

module.exports = {
    get: async (req, res, next) => {
        res.json(await Book.findAll());
    },
    getById: async (req, res, next) => {
        Book.findOne({ where: {id: req.params.id}})
            .then( bookRes => {
                if (bookRes) return res.json(bookRes);

                errors.notFoundError(res);
            });
    },
    post: async(req, res, next) => {
        Book.create(req.body)
            .then(instance => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    bulkPost: async(req, res, next) => {
        Book.bulkCreate(req.body)
            .then(instance => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    put: async(req, res, next) => {
        Book.update(req.body,
                {where: {id: req.params.id}}
            ).then(result => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    delete: async(req, res, next) => {
        Book.destroy({where: {id: req.params.id}})
            .then(destroyedRows => {
                if(destroyedRows) return res.status(204).json();

                errors.notFoundError(res);
            })
            .catch(err => errors.internalServerError(res, err));
    }
}