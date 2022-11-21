'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const BookCategoryRoutes = require('./routes/book-category');
const BookRoutes = require('./routes/book');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');
const authorRoutes = require('./routes/author');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(authorRoutes);
app.use(BookCategoryRoutes);
app.use(BookRoutes);
app.use(categoryRoutes);
app.use(userRoutes);

app.listen(3000, () => {
    console.log('server running');
});