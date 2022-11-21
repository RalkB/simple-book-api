'use strict'

const errors = require('../helpers/errors');
const Author = require('../models').Author;

module.exports = {
    get: async (req, res, next) => {
        res.json(await Author.findAll());
    },
    getById: async (req, res, next) => {
        Author.findOne({ where: {id: req.params.id}})
            .then( authorRes => {
                if (authorRes) return res.json(authorRes);

                errors.notFoundError(res);
            });
    },
    post: async(req, res, next) => {
        Author.create(req.body)
            .then(instance => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    bulkPost: async(req, res, next) => {
        Author.bulkCreate(req.body)
            .then(instance => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    put: async(req, res, next) => {
        Author.update(req.body,
                {where: {id: req.params.id}}
            ).then(result => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    delete: async(req, res, next) => {
        Author.destroy({where: {id: req.params.id}})
            .then(destroyedRows => {
                if(destroyedRows) return res.status(204).json();

                errors.notFoundError(res);
            })
            .catch(err => errors.internalServerError(res, err));
    }
}