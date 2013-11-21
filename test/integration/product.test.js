"use strict";

var should = require("should"),
    assert = require("assert"),
    _ = require("lodash")._,
    Product = require("../../lib/product").Product,
    helper = require("./db.helper").helper;

describe("Product", function() {
    var itemsToDelete = ["test name", "product one", "product two"];

    before(function() {
        helper.cleanup(itemsToDelete);
    });

    after(function() {
        helper.cleanup(itemsToDelete);
    });

    describe("#save", function() {
        describe("when valid", function() {
            var product;

            before(function() {
                product = new Product({
                    "name": "test name",
                    "description": "test description",
                    "price": 100
                });
            });

            it("persists the product", function() {
                product.save(function (errors, savedProduct) {
                    savedProduct._id.should.not.be.undefined;
                    savedProduct.name.should.equal("test name");
                    savedProduct.description.should.equal("test description");
                    savedProduct.price.should.equal(100);
                });
            });

            it("doesn't have errors", function() {
                product.save(function (errors, savedProduct) {
                    assert(errors === null, "Valid product must not have errors");
                });
            });
        });

        describe("when invalid", function() {
            var product;

            before(function() {
                product = new Product({
                    "name": "",
                    "description": "test description",
                    "price": 100
                });
            });

            it("doesn't persist the product", function() {
                product.save(function (errors, savedProduct) {
                    assert(savedProduct === null, "Invalid product must not be saved");
                });
            });

            it("has errors", function() {
                product.save(function (errors, savedProduct) {
                    assert(errors !== null, "Invalid product must have errors");
                });
            });
        });
    });

    describe(".all", function() {
        it("includes all products", function(done) {
            var allNames;

            var assertProductAll = function() {
                Product.all(function(error, products) {
                    allNames = _(products).pluck("name");
                    allNames.should.include("product one");
                    allNames.should.include("product two");
                });
            };

            helper.createProduct({
                "name": "product one"
            })
            .then(helper.createProduct({
                "name": "product two"
            }))
            .then(assertProductAll)
            .then(done, done);
        });
    });
});
