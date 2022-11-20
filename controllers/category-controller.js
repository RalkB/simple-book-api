'use strict'

const errors = require('../helpers/errors');
const Category = require('../models').Category;

module.exports = {
    get: async (req, res, next) => {
        res.json(await Category.findAll());
    },
    getById: async (req, res, next) => {
        Category.findOne({ where: {id: req.params.id}})
            .then( categoryRes => {
                if (categoryRes) return res.json( categoryRes);

                errors.notFoundError(res);
            });
    },
    post: async(req, res, next) => {
        Category.create(req.body)
            .then(instance => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    bulkPost: async(req, res, next) => {
        Category.bulkCreate(req.body)
            .then(instance => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    put: async(req, res, next) => {
        Category.update(req.body,
                {where: {id: req.params.id}}
            ).then(result => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    delete: async(req, res, next) => {
        Category.destroy({where: {id: req.params.id}})
            .then(destroyedRows => {
                if(destroyedRows) return res.status(204).json();

                errors.notFoundError(res);
            })
            .catch(err => errors.internalServerError(res, err));
    }
}