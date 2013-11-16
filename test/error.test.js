"use strict";

var should = require("should"),
    Errors = require("../lib/errors").Errors;

describe("Errors", function() {
    describe("#isPresent", function() {
        describe("when created", function() {
            it("is false", function() {
                new Errors().isPresent().should.equal.false;
            });
        });

        describe("when a new error is added", function() {
            it("is true", function() {
                var errors = new Errors();
                errors.add({
                    attribute: "name",
                    value: "",
                    errorKey: "nameMissing"
                });
                errors.isPresent().should.equal.true;
            });
        });

        describe("when all errors are cleared", function() {
            it("is true", function() {
                var errors = new Errors();
                errors.add({
                    attribute: "name",
                    value: "",
                    errorKey: "nameMissing"
                });
                errors.clear();
                errors.isPresent().should.equal.false;
            });
        });
    });

    describe("#all", function() {
        it("is a list of all the errors", function() {
            var errors = new Errors();
            errors.add({
                attribute: "name",
                value: "",
                errorKey: "nameMissing"
            });
            errors.all().should.eql([{
                attribute: "name",
                value: "",
                message: "Name can't be blank"
            }]);
        });
    });
});
