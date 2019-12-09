'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const { Product } = require('./lib/product');

mongoose.connect('mongodb://localhost:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(morgan('combined'));
app.use(errorhandler());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.set("view options", {
    layout: "layout.pug",
});

const ProductStore = mongoose.model('Product');

app.get('/', function(request, response) {
    response.redirect('/products');
});

app.get('/products', function(request, response) {
    Product.all(function(error, products) {
        response.render('products/index', {
            products: products
        });
    });
});

app.get('/products/new', function(request, response) {
    const product = new ProductStore();
    response.render('products/new', {
        product: product,
        errors: {}
    });
});

app.get('/products/:id/edit', function(request, response) {
    ProductStore.findById(request.params.id, function(error, product) {
        response.render('products/edit', {
            product: product,
            errors: {}
        });
    });
});

app.get('/products/:id', function(request, response) {
    ProductStore.findById(request.params.id, function(error, product) {
        response.render('products/show', {
            product: product
        });
    });
});

app.post('/products', function(request, response) {
    const product = new Product(request.body.product);

    if (product.isValid()) {
        product.save(function(error, product) {
            response.redirect('/products/' + product._id.toHexString());
        });
    } else {
        response.render('products/new', {
            product: product,
            errors: product.errors()
        });
    }
});

app.put('/products/:id', function(request, response) {
    ProductStore.findById(request.params.id, function(error, product) {
        const submittedProduct = new Product(request.body.product);

        product.name = submittedProduct.name;
        product.description = submittedProduct.description;
        product.price = submittedProduct.price;

        if (submittedProduct.isValid()) {
            product.save(function() {
                response.redirect('/products/' + product._id.toHexString());
            });
        } else {
            response.render('products/edit', {
                product: product,
                errors: submittedProduct.errors()
            });
        }
    });
});

app.delete('/products/:id', function(request, response) {
    ProductStore.findById(request.params.id, function(error, product) {
        product.remove();
        response.redirect('/products');
    });
});

app.listen(3000);
