"use strict";

var should = require("should"),
    Product = require("../lib/product").Product,
    Factory = require("./factory").Factory;

describe("Product", function() {
    describe("name", function() {
        it("can be retrieved", function() {
            Factory.product({ name: 'blah' }).get('name').should.equal('blah');
        });

        it("can be set", function() {
            var product = Factory.product({ name: 'blah' });
            product.set('name', 'New');
            product.get('name').should.equal('New');
        });
    });

    describe("price", function() {
        it("can be retrieved", function() {
            Factory.product({ price: 100 }).get('price').should.equal(100);
        });

        it("can be set", function() {
            var product = Factory.product({ price: 10 });
            product.set('price', 20)
            product.get('price').should.equal(20);
        });
    });

    describe("with proper attributes", function() {
        it("is valid", function() {
            Factory.product().isValid().should.be.true;
        });

        it("doesn't have any errors", function() {
            var product = Factory.product();
            product.isValid();
            product.errors().should.be.empty;
        });
    });

    describe("without a name", function() {
        it("is invalid", function() {
            Factory.product({ name: undefined }).isValid().should.be.false;
        });

        it("has an error", function() {
            var product = Factory.product({ name: undefined });
            product.isValid();
            product.errors().should.include("Name can't be blank");
        });
    });

    describe("without a numerical value for price", function() {
        it("is invalid", function() {
            Factory.product({ price: undefined }).isValid().should.be.false;
        });

        it("has an error", function() {
            var product = Factory.product({ price: 'blah' });
            product.isValid();
            product.errors().should.include("Price must be a number");
        });

        it("becomes valid after error is fixed", function() {
            var product = Factory.product({ price: 'blah' });
            product.isValid().should.be.false;
            product.set('price', 10);
            product.isValid().should.be.true;
        });
    });
});
