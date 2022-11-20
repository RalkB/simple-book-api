'use strict'

const errors = require('../helpers/errors');
const BookCategory = require('../models').BookCategory;
const Category = require('../models').Category;
const Book = require('../models').Book;

const isRelationValid = async (obj) => {
    const relation = await BookCategory.findAll(
        {
            where: { 
                book_id: obj.book_id,
                category_id: obj.category_id
            }
        }
    );

    return !(relation.length > 0);
}


module.exports = {
    get: async (req, res, next) => {
        res.json(await BookCategory.findAll());
    },
    getById: async (req, res, next) => {
        BookCategory.findOne({ where: {id: req.params.id}, include: [Category, Book]})
            .then( bookRes => {
                if (bookRes) return res.json(bookRes);

                errors.notFoundError(res);
            });
    },
    getByBookId: async (req, res, next) => {
        BookCategory.findOne({ where: {book_id: req.params.id}, include: [Category, Book]})
            .then( bookRes => {
                if (bookRes) return res.json(bookRes);

                errors.notFoundError(res);
            });
    },
    getByCategoryId: async (req, res, next) => {
        BookCategory.findOne({ where: {category_id: req.params.id}, include: [Category, Book]})
            .then( bookRes => {
                if (bookRes) return res.json(bookRes);

                errors.notFoundError(res);
            });
    },
    post: async(req, res, next) => {
        const validation = await isRelationValid(req.body);
        if(!validation) return errors.badRequestError(res, "relation already exists");
        BookCategory.create(req.body)
            .then(instance => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    bulkPost: async(req, res, next) => {
        for (let i = 0; i < req.body.length; i++) {
            const validation = await isRelationValid(body);
            if(!validation) return errors.badRequestError(res, `relation already exists on index ${i} of body Array`);
        }

        BookCategory.bulkCreate(req.body)
            .then(instance => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    put: async(req, res, next) => {
        BookCategory.update(req.body,
                {where: {id: req.params.id}}
            ).then(result => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    delete: async(req, res, next) => {
        BookCategory.destroy({where: {id: req.params.id}})
            .then(destroyedRows => {
                if(destroyedRows) return res.status(204).json();

                errors.notFoundError(res);
            })
            .catch(err => errors.internalServerError(res, err));
    }
}