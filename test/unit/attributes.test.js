"use strict";

var should = require("should"),
    Attributes = require("../../lib/attributes").Attributes;

describe("Attribute", function() {
    describe("#set", function() {
        it("retrieves created attributes", function() {
            var attributes = new Attributes({
                foo: { value: 'foo value' }
            });
            attributes.foo.should.equal('foo value');
        });

        it("retrieves set values", function() {
            var attributes = new Attributes({
                foo: {}
            });
            attributes.foo = 'foo value';
            attributes.foo.should.equal('foo value');
        });

        describe("when re-set", function() {
            it("retrieves the latest value", function() {
                var attributes = new Attributes({
                    foo: {}
                });
                attributes.foo = 'foo value';
                attributes.foo = 'another foo value';
                attributes.foo.should.equal('another foo value');
            });
        });

        describe("when set for another value", function() {
            it("doesn't mutate the earlier value", function() {
                var attributes = new Attributes({
                    foo: {}
                });
                attributes.foo = 'foo value';
                attributes.bar = 'bar value';
                attributes.foo.should.equal('foo value');
            });
        });
    });

    describe("#validate", function() {
        describe("when missing a mandatory attribute", function() {
            var attributes;
            before(function() {
                attributes = new Attributes({
                    foo: { mandatory: true }
                });
            });

            it("is not valid", function() {
                attributes.isValid().should.be.false;
            });

            it("has errors", function() {
                attributes.errors().should.not.be.empty;
            });
        });

        describe("when all mandatory attributes are present", function() {
            var attributes;
            before(function() {
                attributes = new Attributes({
                    foo: { mandatory: true },
                    bar: { value: undefined }
                });
                attributes.foo = 'foo value';
            });

            it("is valid", function() {
                attributes.isValid().should.be.true;
            });

            it("has no error", function() {
                attributes.errors().should.be.empty;
            });
        });

        describe("when a numerical attribute is a string", function() {
            var attributes;
            before(function() {
                attributes = new Attributes({
                    foo: { value: "10foo", numerical: true }
                });
            });

            it("is is not valid", function() {
                attributes.isValid().should.not.be.true;
            });

            it("is has errors", function() {
                attributes.errors().should.not.be.empty;
            });
        });

        describe("when all numerical attributes are numbers", function() {
            var attributes;
            before(function () {
                attributes = new Attributes({
                    foo: { value: undefined },
                    bar: { numerical: 10 }
                });
                attributes.bar = -10.0;
            });

            it("is valid", function() {
                attributes.isValid().should.be.true;
            });

            it("is has no errors", function() {
                attributes.errors().should.be.empty;
            });
        });

        describe("when a validation error is fixed", function() {
            var attributes;
            before(function () {
                attributes = new Attributes({
                    foo: { mandatory: true }
                });
            });

            it("is valid", function() {
                attributes.isValid().should.be.false;
                attributes.foo = "foo value";
                attributes.isValid().should.be.true;
            });
        });
    });

    describe("#validated", function() {
        describe("when created", function() {
            it("is not validated", function() {
                var attributes = new Attributes({
                    foo: { value: undefined },
                    bar: { numerical: 10 }
                });
                attributes.isValidated().should.be.false;
            });
        });

        describe("when validated after creation", function() {
            it("is validated", function() {
                var attributes = new Attributes({
                    foo: { value: undefined },
                    bar: { numerical: 10 }
                });
                attributes.errors();
                attributes.isValidated().should.be.true;
            });
        });

        describe("when an attribute is set", function() {
            it("is not validated", function() {
                var attributes = new Attributes({
                    foo: { value: undefined },
                    bar: { numerical: 10 }
                });
                attributes.errors();
                attributes.foo = "foo value";
                attributes.isValidated().should.be.false;
            });
        });

        describe("when validated after setting an attribute", function() {
            it("is validated", function() {
                var attributes = new Attributes({
                    foo: { value: undefined },
                    bar: { numerical: 10 }
                });
                attributes.foo = "foo value";
                attributes.errors();
                attributes.isValidated().should.be.true;
            });
        });
    });
});
