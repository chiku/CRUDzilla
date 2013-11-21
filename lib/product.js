"use strict";

var Attributes = require('./attributes').Attributes,
    mongoose   = require('mongoose'),
    Schema     = mongoose.Schema;

var Product = {};
Product.Attributes = function(options) {
    return new Attributes({
        _id :        {  },
        name:        { value: options.name,       mandatory: true },
        price:       { value: options.price,      numerical: true },
        description: { value: options.description                 }
    });
}

Product.Schema = new Schema({
    id:          { type: String, index: true },
    name:        { type: String },
    description: { type: String },
    price:       { type: Number }
});

Product.Store = mongoose.model('Product', Product.Schema);

Product.Model = function(attributes) {
    var product = Object.create(Product.Attributes(attributes));

    var storedProduct = function(product) {
        return new Product.Store({
            name: product.name,
            description: product.description,
            price: product.price
        });
    };

    var attemptSaveProduct = function(callback) {
        return function(error, savedProduct) {
            if (error) {
                return callback(error, null);
            } else {
                product._id = savedProduct._id;
                return callback(null, product);
            }
        }
    };

    product.save = function(callback) {
        if (product.isValid()) {
            storedProduct(product).save(attemptSaveProduct(callback));
        } else {
            callback(product.errors(), null);
        }
    };

    return product;
};

module.exports.Product = Product.Model;
