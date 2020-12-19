'use strict';

const categoryModel = require('../models/categories/categories-schema.js');
const productModel = require('../models/products/product-schema.js');


function whichModel( req, res, next ) {
    const modelName = req.params.model;
    if (modelName === "categories") {
        req.model = categoryModel;
    } else if (modelName === "products") {
        req.model = productModel;
    }
    next();
}

const seeId = ( req, res, next ) => {
    console.log('The id:', req.params.id);
    next();
}

module.exports = {whichModel, seeId};