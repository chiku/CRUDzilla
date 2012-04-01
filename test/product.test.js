"use strict";

var should  = require("should")
  , Product = require("../lib/product").Product
  , Factory = require("./factory").Factory; 

module.exports = {
    "product name can be retrieved": function() {
        Factory.product({name: 'blah'}).get('name').should.equal('blah');
    },

    "product price can be retrieved": function() {
        Factory.product({price: 100}).get('price').should.equal(100);
    },

    "product name can be set": function() {
        var product = Factory.product({name: 'blah'});
        product.set('name', 'New');
        product.get('name').should.equal('New');
    },

    "product price can be set": function() {
        var product = Factory.product({price: 10});
        product.set('price', 20)
        product.get('price').should.equal(20);
    },

    "product is invalid without a name": function() {
        Factory.product({name: undefined}).isValid().should.be.false;
    },

    "product has an error when name is missing": function() {
        var product = Factory.product({name: undefined});
        product.isValid();
        product.errors().should.include("Name can't be blank");
    },

    "product is invalid when price in not numerical": function() {
        Factory.product({price: undefined}).isValid().should.be.false;
    },

    "product has an error when price is a string": function() {
        var product = Factory.product({price: 'blah'});
        product.isValid();
        product.errors().should.include("Price must be a number");
    },

    "product is valid when it has proper attributes": function() {
        Factory.product().isValid().should.be.true;
    },

    "product has no errors when it has proper attributes": function() {
        var product = Factory.product();
        product.isValid();
        product.errors().should.be.empty;
    },

    "product becomes valid after error is fixed": function() {
        var product = Factory.product({price: 'blah'});
        product.isValid().should.be.false;
        product.set('price', 10);
        product.isValid().should.be.true;
    }
};
