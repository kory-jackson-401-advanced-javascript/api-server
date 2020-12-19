'use strict';

const errorHandler = (err, req, res, next) => {
    res.status(404);
    res.send('Unkown route, please use the correct route');
    res.end();
};

module.exports = errorHandler;