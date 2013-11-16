"use strict";

var Product = require("../../lib/product").Product,
    _ = require("lodash");

var Factory = {
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

        _(overrides).each(function(value, key) {
            properties[key] = value;
        });

        return new(type)(properties);
    },
};

module.exports.Factory = Factory;
