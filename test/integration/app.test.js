'use strict';

const Q = require("q");
const should = require("should");
const Browser = require("zombie");

const { helper } = require("./db.helper");

describe("Application", () => {
    const browser = new Browser();

    const assertHomePage = (options = {}) => {
        const html = browser.html();
        browser.text("#header > h2").should.equal("We CRUD Products");
        Object.keys(options).forEach((key) => {
            const value = options[key];
            html.should.containEql(value);
        });
    };

    const assertHomePageWithout = (options = {}) => {
        const html = browser.html();
        browser.text("#header > h2").should.equal("We CRUD Products");
        Object.keys(options).forEach((key) => {
            const value = options[key];
            html.should.not.containEql(value);
        });
    };

    const assertNewProductsPage = () => {
        browser.text("fieldset > legend").should.equal("New Product");
    };

    const assertShowProductPage = (options = {}) => {
        const html = browser.html();
        html.should.containEql("Showing");
        Object.keys(options).forEach((key) => {
            const value = options[key];
            html.should.containEql(value);
        });
    };

    const assertEditProductPage = (options = {}) => {
        const html = browser.html();
        browser.text("fieldset > legend").should.containEql("Editing");
        Object.keys(options).forEach((key) => {
            const value = options[key];
            html.should.containEql(value);
        });
    };

    const clickNewProduct = () => browser.clickLink("New product");

    const clickSaveProduct = () => browser.pressButton("Create product");

    const clickUpdateProduct = () => browser.pressButton("Update product");

    const clickEditProductOnShowPage = () => browser.clickLink("Edit");

    const clickDeleteProduct = (productId) => {
        const selector = "form[action='/products/" + productId + "'] > button";
        return browser.pressButton(selector);
    };

    const fillProductsForm = (options) => browser
            .fill("Name", options.name)
            .then(() => browser.fill("Description", options.description))
            .then(() => browser.fill("Price", options.price));

    const itemsToDelete = ["Brand new product", "Existing product", "Modified product", "Deletable product"];


    before(() => helper.cleanup(itemsToDelete));

    after(() => helper.cleanup(itemsToDelete));

    describe("when landing on home page", () => {
        it("displays product index", () => {
            return browser
                .visit("http://localhost:3000/")
                .then(assertHomePage);
        });
    });

    describe("when navigating to 'Add product'", () => {
        it("creates a new product on submit", () => {
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

    describe("when navigating to 'Edit Product' from show page", () => {
        it("updates a product on submit", () => {
            const price = Math.floor(Math.random() * 70) + 30;

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

    describe("when clicking delete product from index page", () => {
        it("deletes a product on submit", () => {
            const price = Math.floor(Math.random() * 70) + 30;
            let productId;

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
