'use strict';

module.exports = (req, res, next) => {
  let error = { error: err };
  res.status(500).json(error).end();
}