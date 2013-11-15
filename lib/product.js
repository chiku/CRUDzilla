"use strict";

var Attributes = require('./attributes').Attributes,
    mongoose   = require('mongoose'),
    Schema     = mongoose.Schema;

var Product = function(options) {
    options = options || {};
    this.attributes = new Attributes({
        name:        { value: options.name,       mandatory: true },
        price:       { value: options.price,      numerical: true },
        description: { value: options.description                 }
    });
};

Product.prototype = Attributes.Driven;

Product.Store = new Schema({
    id:          { type: String, index: true },
    name:        { type: String },
    description: { type: String },
    price:       { type: Number }
});

module.exports.Product = Product;

mongoose.model('Product', Product.Store);
