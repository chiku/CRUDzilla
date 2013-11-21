"use strict";

var _ = require("lodash")._,
    Q = require("q"),
    should = require("should"),
    Browser = require("zombie"),
    beautifyHtml = require('js-beautify').html,
    helper = require("./db.helper").helper;

describe("Application", function() {
    var browser,

        assertHomePage = function(options) {
            return function() {
                var html = browser.html();
                browser.text("#header > h2").should.equal("We CRUD Products");
                _(options || {}).each(function(value, key) {
                    html.should.include(value);
                });
            }
        },

        assertHomePageWithout = function(options) {
            return function() {
                var html = browser.html();
                browser.text("#header > h2").should.equal("We CRUD Products");
                _(options || {}).each(function(value, key) {
                    html.should.not.include(value);
                });
            }
        },

        assertNewProductsPage = function() {
            return function () {
                browser.text("fieldset > legend").should.equal("New Product");
            }
        },

        assertShowProductPage = function(options) {
            return function() {
                var html = browser.html();
                html.should.include("Showing");
                _(options || {}).each(function(value, key) {
                    html.should.include(value);
                });
            }
        },

        assertEditProductPage = function(options) {
            return function() {
                var html = browser.html();
                browser.text("fieldset > legend").should.include("Editing");
                _(options || {}).each(function(value, key) {
                    html.should.include(value);
                });
            }
        },

        clickNewProduct = function() {
            return browser.clickLink("New product");
        },

        clickSaveProduct = function() {
            return browser.pressButton("Create product");
        },

        clickUpdateProduct = function() {
            return browser.pressButton("Update product");
        },

        clickEditProductOnShowPage = function() {
            return browser.clickLink("Edit");
        },

        clickDeleteProduct = function(productId) {
            return function(){
                var selector = "form[action='/products/" + productId + "'] > button";
                return browser.pressButton(selector);
            }
        },

        fillProductsForm = function(options) {
            return function() {
                browser
                    .fill("Name", options.name)
                    .fill("Description", options.description)
                    .fill("Price", options.price);
            }
        },

        dump = function(selector) {
            return function() {
                var raw = selector ? browser.html(selector) : browser.html(),
                    beautified = beautifyHtml(raw);
                    console.log(beautified);
            }
        },
        
        itemsToDelete = ["Brand new product", "Existing product", "Modified product", "Deletable product"];


    before(function() {
        helper.cleanup(itemsToDelete);
        browser = new Browser();
    });

    after(function() {
        helper.cleanup(itemsToDelete);
    });

    describe("when landing on home page", function() {
        it("displays product index", function(done) {
            browser
                .visit("http://localhost:3000/")
                .then(assertHomePage())
                .then(done, done);
        });
    });

    describe("when navigating to 'Add product'", function() {
        it("creates a new product on submit", function(done) {
            browser
                .visit("http://localhost:3000/")
                .then(clickNewProduct)
                .then(assertNewProductsPage)
                .then(fillProductsForm({
                    "name": "Brand new product",
                    "description": "Product description",
                    "price": 100
                }))
                .then(clickSaveProduct)
                .then(assertShowProductPage({
                    "name": "Brand new product",
                    "description": "Product description",
                    "price": 100
                }))
                .then(done, done);
        });
    });

    describe("when navigating to 'Edit Product' from show page", function() {
        it("updates a product on submit", function(done) {
            var price = Math.floor(Math.random() * 70) + 30,
                browserPromise = function(products) {
                    var product = products[0];
                    return browser
                        .visit("http://localhost:3000/products/" + product._id)
                        .then(assertShowProductPage({
                            "name": "Existing product",
                            "description": "Product description",
                            "price": price - 10
                        }))
                        .then(clickEditProductOnShowPage)
                        .then(assertEditProductPage({
                            "name": "Existing product",
                            "description": "Product description",
                            "price": price - 10
                        }))
                        .then(fillProductsForm({
                            "name": "Modified product",
                            "description": "Product description",
                            "price": price
                        }))
                        .then(clickUpdateProduct)
                        .then(assertShowProductPage({
                            "name": "Modified product",
                            "description": "Product description",
                            "price": price
                        }));
                };

            helper.createProduct({
                "name": "Existing product",
                "description": "Product description",
                "price": price - 10
            })
            .then(browserPromise)
            .then(done, done);
        });
    });

    describe("when clicking delete product from index page", function() {
        it("deletes a product on submit", function(done) {
            var price = Math.floor(Math.random() * 70) + 30,
                browserPromise = function(products) {
                    var product = products[0];
                    return browser
                        .visit("http://localhost:3000/")
                        .then(assertHomePage({
                            "name": "Deletable product",
                            "description": "Product description",
                            "price": price
                        }))
                        .then(clickDeleteProduct(product._id))
                        .then(assertHomePageWithout({
                            "name": "Deletable product"
                        }));
                };

            helper.createProduct({
                "name": "Deletable product",
                "description": "Product description",
                "price": price
            })
            .then(browserPromise)
            .then(done, done);
        });
    });
});
