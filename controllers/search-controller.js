'use strict';

const Book = require('../models').Book;
const Category = require('../models').Category;
const Author = require('../models').Author;
const errors = require('../helpers/errors');
const _ = require('lodash')
const { Op } = require('sequelize');
const book = require('../schema/book');

const getSearchObject = (value) => {
    return  {
        name: {
            [Op.like]: `%${value}%`
        }
    }
}

module.exports = {
    search: async (req, res, next) => {
        try {
            let searchCategory, searchAuthor;
            const search = {};

            if (req.body.id) search.id = req.body.id;
            if (req.body.title) search.title = {[Op.like]: req.body.title};
            if (req.body.category) searchCategory = getSearchObject(req.body.category);
            if (req.body.author) searchAuthor = getSearchObject(req.body.author);

            console.log(searchCategory);
            console.log(searchAuthor);
            
            const bookTemp = await Book.findAll({
                include: [{
                    model: Category,
                    where: searchCategory
                }, {
                    model: Author,
                    where: searchAuthor
                }],
                where: search
            })

            const bookIds = bookTemp.map(el => {return {id: el.id}});

            const book = await Book.findAll({
                include: [Category, Author],
                where: {
                    [Op.or]: bookIds
                }
            })

            return res.json(book);
        } catch (error) {
            console.log(error);
            errors.internalServerError(res, error)
        }
    }
}
