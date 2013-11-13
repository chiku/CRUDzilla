"use strict";

var should = require("should"),
    Attributes = require("../lib/attributes").Attributes;

describe("Attribute", function() {
    it("can be retrieved after creation", function() {
        new Attributes({
            foo: { value: 'foo value' }
        }).get('foo').should.equal('foo value');
    });

    it("can be retrieved after being set", function() {
        var attributes = new Attributes();
        attributes.set('foo', 'foo value');
        attributes.get('foo').should.equal('foo value');
    });

    it("can be re-set", function() {
        var attributes = new Attributes();
        attributes.set('foo', 'foo value');
        attributes.set('foo', 'another foo value');
        attributes.get('foo').should.equal('another foo value');
    });

    describe("with missing mandatory attribute", function() {
        it("is invalid", function() {
            var attributes = new Attributes({
                foo: { mandatory: true }
            });
            attributes.validate();
            attributes.errors.should.not.be.empty;
        });
    });

    describe("with no missing mandatory attribute", function() {
        it("is valid", function() {
            var attributes = new Attributes({
                foo: { mandatory: true },
                bar: { value: undefined }
            });
            attributes.set('foo', 'foo value');
            attributes.validate();
            attributes.errors.should.be.empty;
        });
    });

    describe("with invalid value for a numerical attribute", function() {
        it("is invalid", function() {
            var attributes = new Attributes({
                foo: { value: "10foo", numerical: true }
            });
            attributes.validate();
            attributes.errors.should.not.be.empty;
        });
    });

    describe("with valid value for a number attribute", function() {
        it("is valid", function() {
            var attributes = new Attributes({ foo: { value: undefined },
                bar: { numerical: 10 }
            });
            attributes.set('bar', -10.0);
            attributes.validate();
            attributes.errors.should.be.empty;
        });
    });
});
