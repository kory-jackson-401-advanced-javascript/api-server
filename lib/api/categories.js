'use strict';

const { response } = require('express');
const express = require('express');

const router = express.Router();

const categoriesModel = require('../models/categories/categories-model.js');
const productsModel = require('../models/products/products-model.js');


router.get("/categories", getAll);
router.post('/categories', createOne);
router.get('/categories/:id', getOne);
router.put('/categories/:id', updateOne);
router.delete('/categories/:id', deleteOne);
  
async function getAll(req, res) {
  const response =  await categoriesModel.read();
  const results = {
    count: response.length,
    results: response,
  };
  res.status(200).json(results);
}

async function createOne(req, res) {
  const response = await categoriesModel.create(req.body);

  res.status(200).send(response);
}

async function getOne(req, res) {
  const currentID = req.params.id;
  const response =  await categoriesModel.read(currentID);
  res.status(200).json(response);
}

async function updateOne(req, res) {
  const currentID = req.params.id;
  const response = await categoriesModel.update(currentID, req.body);
  res.status(200).json(response)
}

async function deleteOne(req, res) {
  const currentID = req.params.id;
  const response = await categoriesModel.delete(currentID);
  res.status(200).json(response);
}



module.exports = router;