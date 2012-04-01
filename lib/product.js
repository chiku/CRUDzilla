"use strict";

var Attributes = require('./attributes').Attributes;

var Product = function(options) {
    var options = options || {};
    this.attributes = new Attributes({
        name: { value: options.name, mandatory: true },
        price: { value: options.price, numerical: true }
    });
};

Product.prototype = Attributes.Driven;

module.exports.Product = Product;
