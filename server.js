'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const BookCategoryRoutes = require('./routes/book-category');
const BookRoutes = require('./routes/book');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');

app.use(bodyParser.json());

app.use(BookCategoryRoutes);
app.use(BookRoutes);
app.use(categoryRoutes);
app.use(userRoutes);

app.listen(3000, () => {
    console.log('server running');
});