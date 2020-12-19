'use strict';

const mongoose = require('mongoose');

const Model = require('../mongo-collection.js');

const products = mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    display_name: { type: String },
    description: { type: String }
})

const productSchema = mongoose.model('product', products);

module.exports = new Model(productSchema);