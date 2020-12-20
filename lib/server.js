"use strict";
require("dotenv").config();

// dependencies
const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger.js");

const app = express();

// Global Variables
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

let categoriesDatabase = [
  {
    color: "red",
    desk: "wood",
    id: 4,
    style: "mongolian",
  },
  {
    color: "red",
    desk: "wood",
    id: 6,
    style: "mongolian",
  },
  {
    color: "red",
    desk: "wood",
    id: 8,
    style: "mongolian",
  },
];
let productsDatabase = [
  {
    color: "red",
    desk: "wood",
    id: 4,
    style: "mongolian",
  },
  {
    color: "red",
    desk: "wood",
    id: 6,
    style: "mongolian",
  },
  {
    color: "red",
    desk: "wood",
    id: 8,
    style: "mongolian",
  },
];

function addThings(req, res, next) {
  req.stuff = {
    id: "34",
    desk: "wood",
    color: "blue",
    style: "l-shape",
  };
  next();
}

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

// Categories
// app.get("/categories", getInfo);
// app.post('/categories', createInfo);
// app.put('/categories/:id', updateInfo);
// app.delete('/categories/:id', deleteInfo)

// Products
// app.get('/products', getInfo);
// app.post('/products', createInfo);
// app.put('/products/:id', updateInfo);
// app.delete('/products/:id', deleteInfo)

// sets the req information
app.get("/", addThings, makeThemSame, (req, res) => {
  const parts = {
    query: req.query,
    params: req.params,
    body: req.body,
    stuff: req.stuff,
  };

  res.status(200).json(parts);
});

app.get("/categories", (req, res) => {
  const results = {
    count: categoriesDatabase.length,
    results: categoriesDatabase,
  };
  res.status(200).json(results);
});

app.post("/categories", (req, res) => {
  console.log(req.body);
  categoriesDatabase.push(req.body);
  res.status(200).send("okay");
});

app.get("/categories/:id", (req, res) => {
  const currentID = parseInt(req.params.id);
  const obj = categoriesDatabase.filter((item) => item.id === currentID);
  res.status(200).json(obj);
});

app.delete("/categories/:id", (req, res) => {
  const currentID = parseInt(req.params.id);
  const tempDatabase = [];

  categoriesDatabase.forEach((item) => {
    if (currentID !== item.id) {
      tempDatabase.push(item);
    }
  });
  categoriesDatabase = tempDatabase;

  res.status(200).json(categoriesDatabase);
});

app.get("/products", (req, res) => {
  const results = {
    count: productsDatabase.length,
    results: productsDatabase,
  };
  res.status(200).json(results);
});

app.post("/products", (req, res) => {
  console.log(req.body);
  productsDatabase.push(req.body);
  res.status(200).send("okay");
});

app.get("/products/:id", (req, res) => {
  const currentID = parseInt(req.params.id);
  const obj = productsDatabase.filter((item) => item.id === currentID);
  res.status(200).json(obj);
});

app.delete("/products/:id", (req, res) => {
  const currentID = parseInt(req.params.id);
  const tempDatabase = [];

  productsDatabase.forEach((item) => {
    if (currentID !== item.id) {
      tempDatabase.push(item);
    }
  });
  productsDatabase = tempDatabase;
  res.status(200).json(productsDatabase);
});


module.exports = {
  app,
  start: (port) => app.listen(port, console.log("up on ", port)),
};
