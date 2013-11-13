"use strict";

var should = require("should"),
    Validations = require("../lib/validations").Validations;

describe("Numerical validation", function() {
    it("add to errors when value is empty string", function() {
        var errors = [];
        Validations.Numerical("foo", "", errors);
        errors.should.include("Foo must be a number");
    });

    it("add to errors when value is undefined", function() {
        var errors = [];
        Validations.Numerical("foo", undefined, errors);
        errors.should.include("Foo must be a number");
    });

    it("add to errors when value is null", function() {
        var errors = [];
        Validations.Numerical("foo", null, errors);
        errors.should.include("Foo must be a number");
    });

    it("don't add to errors when value is a number", function() {
        var errors = [];
        Validations.Numerical("foo", 100, errors);
        errors.should.be.empty;
    });

    it("don't accept partial numbers", function() {
        var errors = [];
        Validations.Numerical("foo", "100foo", errors);
        errors.should.include("Foo must be a number");
    });

    it("accept 0 as a proper value", function() {
        var errors = [];
        Validations.Numerical("foo", 0, errors);
        errors.should.be.empty;
    });

    it("consider a negative number as valid", function() {
        var errors = [];
        Validations.Numerical("foo", -10.75, errors);
        errors.should.be.empty;
    });
});
