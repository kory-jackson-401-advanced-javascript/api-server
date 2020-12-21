'use strict';

const express = require('express');

const router = express.Router();

const productsModel = require('../models/products/products-model.js');


router.get("/products", getAll);
router.post('/products', createOne);
router.get('/products/:id', getOne);
router.put('/products/:id', updateOne);
router.delete('/products/:id', deleteOne);
  
async function getAll(req, res) {
  const response =  await productsModel.read();
  const results = {
    count: response.length,
    results: response,
  };
  res.status(200).json(results);
}

async function createOne(req, res) {
  const response = await productsModel.create(req.body);

  res.status(200).send(response);
}

async function getOne(req, res) {
  const currentID = req.params.id;
  const response =  await productsModel.read(currentID);
  res.status(200).json(response);
}

async function updateOne(req, res) {
  const currentID = req.params.id;
  const response = await productsModel.update(currentID, req.body);
  res.status(200).json(response)
}

async function deleteOne(req, res) {
  const currentID = req.params.id;
  const response = await productsModel.delete(currentID);
  res.status(200).json(response);
}



module.exports = router;