var mongoose = require('mongoose'),
    Q = require('q'),
    _ = require("lodash")._,
    db = mongoose.connect('mongodb://localhost:27017/db'),
    Product = require('../../lib/product').Product,
    ProductStore = db.model('Product');

var helper = {
    createProduct: function(options, callback) {
        new ProductStore(options).save(function(error, product) {
            callback(product);
        });
    },

    deleteProduct: function(id) {
        ProductStore.findById(id, function(error, product) {
            product.remove();
        });
    },

    cleanup: function(names) {
        _(names).each(function(name) {
            ProductStore.remove({
                "name": name
            }).exec();
        });
    }
};

module.exports.helper = helper;
