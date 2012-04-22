var express = require('express')
  , app = express.createServer()
  , util = require('util')
  , mongoose = require('mongoose')
  , db = mongoose.connect('mongodb://localhost:27017/db');

app.configure(function(){
  app.use(express.logger());
  app.use(express.errorHandler());
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

app.set('views', __dirname + '/views'); 
app.set('view engine', 'jade');

var Product = require ('./lib/product').Product
  , ProductStore = db.model('Product');

app.get('/', function(request, response) {
  response.redirect('/products');
});

app.get('/products', function(request, response){
  ProductStore.find(function(error, products){
    response.render('products/index', {locals: {
      products: products
    }});
  });
});

app.get('/products/new', function(request, response) {
  response.render('products/new', {
    locals: {
      product: request.body && request.body.product || new ProductStore()
    }
  });
});

app.get('/products/:id/edit', function(request, response){
  var product = ProductStore.find(request.params.id);
  ProductStore.findById(request.params.id, function(error, product){
    response.render('products/edit', {
      locals: {
        product: product
      }
    });    
  });
});

app.get('/products/:id', function(request, response){
  ProductStore.findById(request.params.id, function(error, product){
    response.render('products/show', {
      locals: {
        product: product
      }
    })
  });
});

app.post('/products', function(request, response) {
  var product = new ProductStore(request.body.product);
  product.save(function(){
    response.redirect('/products/' + product._id.toHexString());
  });
});


app.put('/products/:id', function(request, response){
  ProductStore.findById(request.params.id, function(error, product) {
    product.name = request.body.product.name;
    product.description = request.body.product.description;
    product.price = request.body.product.price;
    product.save(function(){
      response.redirect('/products/' + product._id.toHexString());
    });
  });
});

app.listen(3000);
