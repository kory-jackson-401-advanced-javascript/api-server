"use strict";
require("dotenv").config();

// dependencies
const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger.js");
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');

const app = express();

// Global Variables
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use(makeThemSame);

// routes
app.use('/', categoriesRoutes, productsRoutes);

/**
 * Goes through the database and puts them to lowercase to match
 * @param {*} req the info that gets passed
 * @param {*} res
 * @param {*} next goes to the next functino
 */
function makeThemSame(req, res, next) {
  Object.keys(req.query).forEach((key) => {
    req.query[key] = req.query[key].toLowerCase();
  });
  next();
}

module.exports = {
  app,
  start: (port) => app.listen(port, console.log("up on ", port)),
};
