'use strict';

const mongoose = require('mongoose');
const Q = require('q');

const connection = mongoose.createConnection('mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Product = require('../../lib/product').Product;
const ProductStore = connection.model('Product');

const helper = {
    createProduct: (options) => {
        const product = new ProductStore(options);
        return Q.ninvoke(product.save.bind(product));
    },

    deleteProduct: (id) => ProductStore.findById(id, (error, product) => product.remove()),

    cleanup: (names) => {
        names.forEach((name) => {
            ProductStore.deleteMany({
                "name": name
            }).exec();
        });
    },
};

after(() => connection.close());

module.exports.helper = helper;
