'use strict'

const errors = require('../helpers/errors');
const BookAuthor = require('../models').BookAuthor;

module.exports = {
    post: async(req, res, next) => {
        BookAuthor.create(req.body)
            .then(instance => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    delete: async(req, res, next) => {
        BookAuthor.destroy({where: {author_id: req.params.id}})
            .then(destroyedRows => {
                if(destroyedRows) return res.status(204).json();

                errors.notFoundError(res);
            })
            .catch(err => errors.internalServerError(res, err));
    },
    put: async(req, res, next) => {
        BookAuthor.update(req.body,
                {where: {book_id: req.params.bookId, author_id: req.params.author_id}}
            ).then(result => {
                res.json(req.body);
            })
            .catch(err => errors.internalServerError(res, err));
    },
}