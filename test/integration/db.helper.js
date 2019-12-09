var mongoose = require('mongoose'),
    Q = require('q'),
    _ = require("lodash")._;

var connection = mongoose.createConnection('mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var Product = require('../../lib/product').Product,
    ProductStore = connection.model('Product');

var helper = {
    createProduct: function(options) {
        var product = new ProductStore(options);
        return Q.ninvoke(product.save.bind(product));
    },

    deleteProduct: function(id) {
        ProductStore.findById(id, function(error, product) {
            product.remove();
        });
    },

    cleanup: function(names) {
        _(names).each(function(name) {
            ProductStore.deleteMany({
                "name": name
            }).exec();
        });
    },
};

after(() => connection.close());

module.exports.helper = helper;
