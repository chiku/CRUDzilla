"use strict";

var _ = require("lodash")._,
    Q = require("q"),
    should = require("should"),
    Browser = require("zombie"),
    helper = require("./db.helper").helper;

describe("Application", function() {
    var browser = new Browser(),

        assertHomePage = function(options) {
            var html = browser.html();
            browser.text("#header > h2").should.equal("We CRUD Products");
            _(options || {}).each(function(value, key) {
                html.should.containEql(value);
            });
        },

        assertHomePageWithout = function(options) {
            var html = browser.html();
            browser.text("#header > h2").should.equal("We CRUD Products");
            _(options || {}).each(function(value, key) {
                html.should.not.containEql(value);
            });
        },

        assertNewProductsPage = function() {
            browser.text("fieldset > legend").should.equal("New Product");
        },

        assertShowProductPage = function(options) {
            var html = browser.html();
            html.should.containEql("Showing");
            _(options || {}).each(function(value, key) {
                html.should.containEql(value);
            });
        },

        assertEditProductPage = function(options) {
            var html = browser.html();
            browser.text("fieldset > legend").should.containEql("Editing");
            _(options || {}).each(function(value, key) {
                html.should.containEql(value);
            });
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
            var selector = "form[action='/products/" + productId + "'] > button";
            return browser.pressButton(selector);
        },

        fillProductsForm = function(options) {
            return browser
                .fill("Name", options.name)
                .then(() => browser.fill("Description", options.description))
                .then(() => browser.fill("Price", options.price));
        },

        itemsToDelete = ["Brand new product", "Existing product", "Modified product", "Deletable product"];


    before(function() {
        helper.cleanup(itemsToDelete);
    });

    after(function() {
        helper.cleanup(itemsToDelete);
    });

    describe("when landing on home page", function() {
        it("displays product index", function() {
            return browser
                .visit("http://localhost:3000/")
                .then(assertHomePage);
        });
    });

    describe("when navigating to 'Add product'", function() {
        it("creates a new product on submit", function() {
            return browser
                .visit("http://localhost:3000/")
                .then(clickNewProduct)
                .then(assertNewProductsPage)
                .then(() => fillProductsForm({
                    "name": "Brand new product",
                    "description": "Product description",
                    "price": 100
                }))
                .then(clickSaveProduct)
                .then(() => assertShowProductPage({
                    "name": "Brand new product",
                    "description": "Product description",
                    "price": 100
                }));
        });
    });

    describe("when navigating to 'Edit Product' from show page", function() {
        it("updates a product on submit", function() {
            var price = Math.floor(Math.random() * 70) + 30;

            return helper.createProduct({
                    "name": "Existing product",
                    "description": "Product description",
                    "price": price - 10
                })
                .then((product) => browser.visit("http://localhost:3000/products/" + product._id))
                .then(() => assertShowProductPage({
                    "name": "Existing product",
                    "description": "Product description",
                    "price": price - 10
                }))
                .then(clickEditProductOnShowPage)
                .then(() => assertEditProductPage({
                    "name": "Existing product",
                    "description": "Product description",
                    "price": price - 10
                }))
                .then(() => fillProductsForm({
                    "name": "Modified product",
                    "description": "Product description",
                    "price": price
                }))
                .then(clickUpdateProduct)
                .then(() => assertShowProductPage({
                    "name": "Modified product",
                    "description": "Product description",
                    "price": price
                }));
        });
    });

    describe("when clicking delete product from index page", function() {
        it("deletes a product on submit", function() {
            var price = Math.floor(Math.random() * 70) + 30,
                productId;

            return helper.createProduct({
                    "name": "Deletable product",
                    "description": "Product description",
                    "price": price
                })
                .then((product) => {
                    productId = product._id;
                    return browser.visit("http://localhost:3000/");
                })
                .then(() => assertHomePage({
                    "name": "Deletable product",
                    "description": "Product description",
                    "price": price
                }))
                .then(() => clickDeleteProduct(productId))
                .then(() => assertHomePageWithout({
                    "name": "Deletable product"
                }));
        });
    });
});
