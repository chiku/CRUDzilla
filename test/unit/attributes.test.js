'use strict';

const should = require("should");

const { Attributes } = require("../../lib/attributes");

describe("Attribute", () => {
    describe("#set", () => {
        it("retrieves created attributes", () => {
            const attributes = new Attributes({
                foo: { value: 'foo value' }
            });
            attributes.foo.should.equal('foo value');
        });

        it("retrieves set values", () => {
            const attributes = new Attributes({
                foo: {}
            });
            attributes.foo = 'foo value';
            attributes.foo.should.equal('foo value');
        });

        describe("when re-set", () => {
            it("retrieves the latest value", () => {
                const attributes = new Attributes({
                    foo: {}
                });
                attributes.foo = 'foo value';
                attributes.foo = 'another foo value';
                attributes.foo.should.equal('another foo value');
            });
        });

        describe("when set for another value", () => {
            it("doesn't mutate the earlier value", () => {
                const attributes = new Attributes({
                    foo: {}
                });
                attributes.foo = 'foo value';
                attributes.bar = 'bar value';
                attributes.foo.should.equal('foo value');
            });
        });
    });

    describe("#validate", () => {
        describe("when missing a mandatory attribute", () => {
            const attributes = new Attributes({
                foo: { mandatory: true }
            });

            it("is not valid", () => {
                attributes.isValid().should.be.false;
            });

            it("has errors", () => {
                attributes.errors().should.not.be.empty;
            });
        });

        describe("when all mandatory attributes are present", () => {
            const attributes = new Attributes({
                foo: { mandatory: true },
                bar: { value: undefined }
            });
            attributes.foo = 'foo value';

            it("is valid", () => {
                attributes.isValid().should.be.true;
            });

            it("has no error", () => {
                attributes.errors().should.be.empty;
            });
        });

        describe("when a numerical attribute is a string", () => {
            const attributes = new Attributes({
                foo: { value: "10foo", numerical: true }
            });

            it("is is not valid", () => {
                attributes.isValid().should.not.be.true;
            });

            it("is has errors", () => {
                attributes.errors().should.not.be.empty;
            });
        });

        describe("when all numerical attributes are numbers", () => {
            const attributes = new Attributes({
                foo: { value: undefined },
                bar: { numerical: 10 }
            });
            attributes.bar = -10.0;

            it("is valid", () => {
                attributes.isValid().should.be.true;
            });

            it("is has no errors", () => {
                attributes.errors().should.be.empty;
            });
        });

        describe("when a validation error is fixed", () => {
            const attributes = new Attributes({
                foo: { mandatory: true }
            });;

            it("is valid", () => {
                attributes.isValid().should.be.false;
                attributes.foo = "foo value";
                attributes.isValid().should.be.true;
            });
        });
    });

    describe("#validated", () => {
        describe("when created", () => {
            it("is not validated", () => {
                const attributes = new Attributes({
                    foo: { value: undefined },
                    bar: { numerical: 10 }
                });
                attributes.isValidated().should.be.false;
            });
        });

        describe("when validated after creation", () => {
            it("is validated", () => {
                const attributes = new Attributes({
                    foo: { value: undefined },
                    bar: { numerical: 10 }
                });
                attributes.errors();
                attributes.isValidated().should.be.true;
            });
        });

        describe("when an attribute is set", () => {
            it("is not validated", () => {
                const attributes = new Attributes({
                    foo: { value: undefined },
                    bar: { numerical: 10 }
                });
                attributes.errors();
                attributes.foo = "foo value";
                attributes.isValidated().should.be.false;
            });
        });

        describe("when validated after setting an attribute", () => {
            it("is validated", () => {
                const attributes = new Attributes({
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
