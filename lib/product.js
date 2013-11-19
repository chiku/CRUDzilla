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
    var obj = Object.create(Product.Attributes(attributes));

    // TODO : Don't save if product is invalid
    // TODO : Send back the product itself
    obj.save = function(callback) {
        new Product.Store({
            name: obj.name,
            description: obj.description,
            price: obj.price
        }).save(callback);
    };

    return obj;
};

module.exports.Product = Product.Model;
