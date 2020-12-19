'use strict';

const express = require('express');
const router = express.Router();

const whichModel = require('../middleware/model-finder').whichModel;
const seeId = require('../middleware/model-finder').seeId;


router.param('model', whichModel);
router.param('id', seeId);



router.get('/:model', getAll);
router.get('/:model/:id', getOne);
router.post('/:model', saveOne);
router.put('/:model/:id', updateOne);
router.delete('/:model/:id', deleteOne);



async function getAll( req, res ) {
    try {
        console.log(req)
        let results = await req.model.read();
        let print = {
            count: results.length,
            results
        }
        res.status(200).json(print);
    } catch {
        console.error('Error getting all files');
    }
};

async function getOne( req, res ) {
    try {
        let id = req.params.id;
        let results = await req.model.read(id);
        console.log(results, 'results in getOne function=========')
        let print = {
            count: results.length,
            results
        }
        res.status(200).json(print);
    } catch {
        console.error('Error getting specified file');
    }
}

async function saveOne( req, res ) {
    try {

        let saveMe = await req.model.create(req.body);
        res.status(200).json(saveMe);
        console.log('I saved the info');
    } catch {
        console.error('Error Saving');
    }
}

async function updateOne( req, res ) {
    try {
        let result = await req.model.update(req.params.id, req.body);
        res.status(200).json(result);
    } catch {
        console.error('Error Updating');
    }
}

async function deleteOne( req, res, ) {
    try {
        let id = req.params.id;
        await req.model.delete(id);
        res.status(204).send(id);
    } catch (e) {
        console.error(e)
    }
}

module.exports = router;