'use strict'
require("dotenv").config();
const errors = require('../helpers/errors');
const User = require('../models').User;
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    signUp: async(req, res, next) => {
        const hash = bcrypt.hashSync(req.body.password, salt);

        const userBody = {
            username: req.body.username,
            email: req.body.email,
            password: hash
        }

        User.create(userBody)
            .then(instance => {
                res.status(204).json();
            })
            .catch(err => errors.internalServerError(res, err));
    },
    signIn: async(req, res, next) => {
        User.findOne(
            {
                where: {
                    [Op.or]: [
                        {username: req.body.login},
                        {email: req.body.login}
                    ]
                }
            }
        ).then(instance => {
            const login = bcrypt.compareSync(req.body.password, instance.password);

            if(!login) return errors.unauthorizedError(res);

            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: instance.email
            }, process.env.SECRET_JWT);

            res.json({
                token: token
            });
        })
    }
}