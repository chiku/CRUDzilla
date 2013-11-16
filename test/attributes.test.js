"use strict";

var should = require("should"),
    Attributes = require("../lib/attributes").Attributes;

describe("Attribute", function() {
    describe("#set", function() {
        it("retrieves created attributes", function() {
            var attributes = new Attributes({
                foo: { value: 'foo value' }
            });
            attributes.get('foo').should.equal('foo value');
        });

        it("retrieves set values", function() {
            var attributes = new Attributes();
            attributes.set('foo', 'foo value');
            attributes.get('foo').should.equal('foo value');
        });

        describe("when re-set", function() {
            it("retrieves the latest value", function() {
                var attributes = new Attributes();
                attributes.set('foo', 'foo value');
                attributes.set('foo', 'another foo value');
                attributes.get('foo').should.equal('another foo value');
            });
        });
    });

    describe("#validate", function() {
        describe("when missing a mandatory attribute", function() {
            it("has errors", function() {
                var attributes = new Attributes({
                    foo: { mandatory: true }
                });
                attributes.errors().should.not.be.empty;
            });
        });

        describe("when all mandatory attribute are present", function() {
            it("has no error", function() {
                var attributes = new Attributes({
                    foo: { mandatory: true },
                    bar: { value: undefined }
                });
                attributes.set('foo', 'foo value');
                attributes.errors().should.be.empty;
            });
        });

        describe("when a numerical attribute is a string", function() {
            it("is has errors", function() {
                var attributes = new Attributes({
                    foo: { value: "10foo", numerical: true }
                });
                attributes.errors().should.not.be.empty;
            });
        });

        describe("when all numerical attribute are number", function() {
            it("is has no errors", function() {
                var attributes = new Attributes({ foo: { value: undefined },
                    bar: { numerical: 10 }
                });
                attributes.set('bar', -10.0);
                attributes.errors().should.be.empty;
            });
        });
    });
});
