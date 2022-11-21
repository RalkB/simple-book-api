'use strict'

const errors = require('../helpers/errors');
const Book = require('../models').Book;
const BookAuthor = require('../models').BookAuthor;
const Author = require('../models').Author;
const Category = require('../models').Category;
const _ = require("lodash");

const parseBookAuthor = (bookId, authors) => {
    const bookAuthor = [];
    for (const author of authors) {
        bookAuthor.push({
            author_id: author,
            book_id: bookId
        });
    }

    return bookAuthor;
}

module.exports = {
    get: async (req, res, next) => {
        res.json(await Book.findAll({include: [Category, Author]}));
    },
    getById: async (req, res, next) => {
        Book.findOne({ where: {id: req.params.id}})
            .then( bookRes => {
                if (bookRes) return res.json(bookRes);

                errors.notFoundError(res);
            });
    },
    post: async(req, res, next) => {
        const bookBody = _.omit(req.body, "author")
        const authors = req.body.authors; 

        try {
            const book = await Book.create(bookBody);

            const bookAuthors = parseBookAuthor(book.id, authors);
            await BookAuthor.bulkCreate(bookAuthors);

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
        Book.destroy({where: {id: req.params.id}})
            .then(destroyedRows => {
                if(destroyedRows) return res.status(204).json();

                errors.notFoundError(res);
            })
            .catch(err => errors.internalServerError(res, err));
    }
}