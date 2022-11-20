'use strict'

module.exports = {
    notFoundError: res => {
        res.status(404);
        res.send()
    },
    internalServerError: (res, error) => {
        if (error.errors) return res.status(500).json(error.errors[0]);
        
        res.status(500).json(error);
    },
    badRequestError: (res, error) => {
        res.status(400).json(error);
    },
    unauthorizedError: (res) => {
        res.status(401).json();
    }
}