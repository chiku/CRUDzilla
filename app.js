var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    db = mongoose.connect('mongodb://localhost:27017/db');

app.configure(function() {
    app.use(express.logger());
    app.use(express.errorHandler());
    app.use(express.static(__dirname + '/public'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", {
    layout: "layout.jade"
});

var Product = require('./lib/product').Product,
    ProductStore = db.model('Product');

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
    var product = new ProductStore();
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
    var product = new Product(request.body.product);

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
        var submittedProduct = new Product(request.body.product);

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
