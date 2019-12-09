'use strict';

const should = require("should");
const { Errors } = require("../../lib/errors");

describe("Errors", () => {
    describe("#isPresent", () => {
        describe("when created", () => {
            it("is false", () => {
                new Errors().isPresent().should.equal.false;
            });
        });

        describe("when a new error is added", () => {
            it("is true", () => {
                const errors = new Errors();
                errors.add({
                    attribute: "name",
                    value: "",
                    errorKey: "nameMissing"
                });
                errors.isPresent().should.equal.true;
            });
        });

        describe("when all errors are cleared", () => {
            it("is true", () => {
                const errors = new Errors();
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

    describe("#all", () => {
        it("is a list of all the errors", () => {
            const errors = new Errors();
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
