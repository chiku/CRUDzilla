"use strict";

var should = require("should"),
    Validations = require("../lib/validations").Validations;

describe("Mandatory validations", function() {
    it("add to errors when value is empty string", function() {
        Validations.Mandatory("foo", "").should.be.false;
    });

    it("add to errors when value is undefined", function() {
        Validations.Mandatory("foo", undefined).should.be.false;
    });

    it("add to errors when value is null", function() {
        Validations.Mandatory("foo", null).should.be.false;
    });

    it("don't add to errors when value is present", function() {
        Validations.Mandatory("foo", "value").should.be.true;
    });

    it("accept 0 as a proper value", function() {
        Validations.Mandatory("foo", 0).should.be.true;
    });
});

describe("Numerical validation", function() {
    it("add to errors when value is empty string", function() {
        Validations.Numerical("foo", "").should.be.false;
    });

    it("add to errors when value is undefined", function() {
        Validations.Numerical("foo", undefined).should.be.false;
    });

    it("add to errors when value is null", function() {
        Validations.Numerical("foo", null).should.be.false;
    });

    it("don't add to errors when value is a number", function() {
        Validations.Numerical("foo", 100).should.be.true;
    });

    it("don't accept partial numbers", function() {
        Validations.Numerical("foo", "100foo").should.be.false;
    });

    it("accept 0 as a proper value", function() {
        Validations.Numerical("foo", 0).should.be.true;
    });

    it("consider a negative number as valid", function() {
        Validations.Numerical("foo", -10.75).should.be.true;
    });
});
