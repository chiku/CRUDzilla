"use strict";

var should     = require("should")
  , Attributes = require("../lib/attributes").Attributes;

module.exports = {
	"An attribute can be retrieved after creation": function() {
		new Attributes({ foo: {value: 'foo value'} }).get('foo').should.equal('foo value');
	},

    "An attribute can be retrieved after being set": function() {
        var attributes = new Attributes();
        attributes.set('foo', 'foo value');
        attributes.get('foo').should.equal('foo value');
    },

    "An attribute can be re-set": function() {
        var attributes = new Attributes();
        attributes.set('foo', 'foo value');
        attributes.set('foo', 'another foo value');
        attributes.get('foo').should.equal('another foo value');
    },

    "Missing a mandatory attribute is an error": function() {
        var attributes = new Attributes({ foo: {mandatory: true}});
        attributes.validate();
        attributes.errors.should.not.be.empty;
    },

    "Missing a non-mandatory attribute is not an error": function() {
        var attributes = new Attributes({ foo: {mandatory: true}, bar: {value: undefined}});
        attributes.set('foo', 'foo value');
        attributes.validate();
        attributes.errors.should.be.empty;
    },

    "Not having a number for a numerical attribute is an error": function() {
        var attributes = new Attributes({ foo: {value: "10foo", numerical: true}});
        attributes.validate();
        attributes.errors.should.not.be.empty;
    },

    "Having a number for a numerical attribute is not an error": function() {
        var attributes = new Attributes({ foo: {value: undefined}, bar: {numerical: 10}});
        attributes.set('bar', -10.0);
        attributes.validate();
        attributes.errors.should.be.empty;
    }
};
