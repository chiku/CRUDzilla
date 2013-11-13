"use strict";

var should = require("should"),
    Validations = require("../lib/validations").Validations;

describe("Mandatory validations", function() {
    it("add to errors when value is empty string", function() {
        var errors = [];
        Validations.Mandatory("foo", "", errors);
        errors.should.include("Foo can't be blank");
    });

    it("add to errors when value is undefined", function() {
        var errors = [];
        Validations.Mandatory("foo", undefined, errors);
        errors.should.include("Foo can't be blank");
    });

    it("add to errors when value is null", function() {
        var errors = [];
        Validations.Mandatory("foo", null, errors);
        errors.should.include("Foo can't be blank");
    });

    it("don't add to errors when value is present", function() {
        var errors = [];
        Validations.Mandatory("foo", "value", errors);
        errors.should.be.empty;
    });

    it("accept 0 as a proper value", function() {
        var errors = [];
        Validations.Mandatory("foo", 0, errors);
        errors.should.be.empty;
    });
});
