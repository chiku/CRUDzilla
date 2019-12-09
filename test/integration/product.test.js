'use strict';

const should = require("should");
const assert = require("assert");

const { Product } = require("../../lib/product");
const { helper } = require("./db.helper");

describe("Product", () => {
    const itemsToDelete = ["test name", "product one", "product two"];

    before(() => helper.cleanup(itemsToDelete));

    after(() => helper.cleanup(itemsToDelete));

    describe("#save", () => {
        describe("when valid", () => {
            const product = new Product({
                "name": "test name",
                "description": "test description",
                "price": 100
            });


            it("persists the product", () => {
                product.save((errors, savedProduct) => {
                    savedProduct._id.should.not.be.undefined;
                    savedProduct.name.should.equal("test name");
                    savedProduct.description.should.equal("test description");
                    savedProduct.price.should.equal(100);
                });
            });

            it("doesn't have errors", () => {
                product.save((errors, savedProduct) => {
                    assert(errors === null, "Valid product must not have errors");
                });
            });
        });

        describe("when invalid", () => {
            const product = new Product({
                "name": "",
                "description": "test description",
                "price": 100
            });

            it("doesn't persist the product", () => {
                product.save((errors, savedProduct) => {
                    assert(savedProduct === null, "Invalid product must not be saved");
                });
            });

            it("has errors", () => {
                product.save((errors, savedProduct) => {
                    assert(errors !== null, "Invalid product must have errors");
                });
            });
        });
    });

    describe(".all", () => {
        it("includes all products", () => {
            const assertProductAll = () => {
                Product.all((error, products) => {
                    const allNames = products.map((product) => product.name);
                    allNames.should.containEql("product one");
                    allNames.should.containEql("product two");
                });
            };

            return helper.createProduct({ "name": "product one" })
                .then(() => helper.createProduct({ "name": "product two" }))
                .then(() => assertProductAll());
        });
    });
});
