'use strict'

const errors = require('../helpers/errors');
const Book = require('../models').Book;
const Author = require('../models').Author;
const Category = require('../models').Category;
const BookCategory = require('../models').BookCategory;
const BookAuthor = require('../models').BookAuthor;

module.exports = {
    get: async (req, res, next) => {
        res.json(await Book.findAll({include: [Category, Author]}));
    },
    getById: async (req, res, next) => {
        Book.findOne({include:[Category, Author], where: {id: req.params.id}})
            .then( bookRes => {
                if (bookRes) return res.json(bookRes);

                errors.notFoundError(res);
            });
    },
    post: async(req, res, next) => {
        try {
            await Book.create(req.body);

            res.status(204).json();
        } catch (error) {
            errors.internalServerError(res, error)
        }
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
        try {
            const id = req.params.id;

            await BookCategory.destroy({where: {book_id: id}});
            await BookAuthor.destroy({where: {book_id: id}});
            await Book.destroy({where: {id: id}});

            return res.status(204).json()
        } catch (error) {
            console.log(error);
            errors.internalServerError(res, error)
        }
    }
}