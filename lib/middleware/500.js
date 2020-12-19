'use strict';

const error500 = ((err, req, res, next) => {
    const output = {
        error: err
    };
    res.status(500).json(output);
})

module.exports = error500;