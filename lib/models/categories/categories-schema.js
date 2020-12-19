'use strict';

const mongoose = require('mongoose');

const Model = require('../mongo-collection.js');

const categories = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String }
});

const categoriesSchema = mongoose.model('categories', categories);

module.exports = new Model(categoriesSchema);