'use strict';

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/lib/middleware/model-finder.js`);

const router = express.Router();

router.param('model', modelFinder.load)

router.get("/:model", getAll);
router.post('/:model', createOne);
router.get('/:model/:id', getOne);
router.put('/:model/:id', updateOne);
router.delete('/:model/:id', deleteOne);
  
async function getAll(req, res) {
  const response =  await req.model.read();
  const results = {
    count: response.length,
    results: response,
  };
  res.status(200).json(results);
}

async function createOne(req, res) {
  const response = await req.model.create(req.body);

  res.status(200).send(response);
}

async function getOne(req, res) {
  const currentID = req.params.id;
  const response =  await req.model.read(currentID);
  res.status(200).json(response);
}

async function updateOne(req, res) {
  const currentID = req.params.id;
  const response = await req.model.update(currentID, req.body);
  res.status(200).json(response)
}

async function deleteOne(req, res) {
  const currentID = req.params.id;
  const response = await req.model.delete(currentID);
  res.status(200).json(response);
}



module.exports = router;