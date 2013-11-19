"use strict";

var should = require("should"),
    Product = require("../../lib/product").Product,
    helper = require("./db.helper").helper;

describe("Product", function() {
    var itemsToDelete = ["test name"];

    before(function() {
        helper.cleanup(itemsToDelete);
    });

    after(function() {
        helper.cleanup(itemsToDelete);
    });

    describe("#save", function() {
        it("persists the product", function() {
            new Product({
                "name": "test name",
                "description": "test description",
                "price": 100
            }).save(function (error, savedProduct) {
                savedProduct._id.should.not.be.undefined;
                savedProduct.name.should.equal("test name");
                savedProduct.description.should.equal("test description");
                savedProduct.price.should.equal(100);
            })
        });
    });
});
