"use strict";

var Product = require("../lib/product").Product;

var Factory =  {
    properties: {
        Product: function() {
            return {
                name: 'Product',
                price: 10
            };
        }
    },

    product: function(overrides) {
        return this.create(Product, 'Product', overrides);
    },

    create: function(type, name, overrides) {
        var properties = new this.properties[name];
        for (var attr in overrides) {
            if (overrides.hasOwnProperty(attr)) {
                properties[attr] = overrides[attr];
            }
        }
        return new (type)(properties);
    },
};

module.exports.Factory = Factory;
