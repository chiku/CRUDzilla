'use strict';

const should = require("should");
const { Validations } = require("../../lib/validations");

describe("Mandatory validations", () => {
    it("add to errors when value is empty string", () => {
        Validations.Mandatory("foo", "").should.be.false;
    });

    it("add to errors when value is undefined", () => {
        Validations.Mandatory("foo", undefined).should.be.false;
    });

    it("add to errors when value is null", () => {
        Validations.Mandatory("foo", null).should.be.false;
    });

    it("don't add to errors when value is present", () => {
        Validations.Mandatory("foo", "value").should.be.true;
    });

    it("accept 0 as a proper value", () => {
        Validations.Mandatory("foo", 0).should.be.true;
    });
});

describe("Numerical validation", () => {
    it("add to errors when value is empty string", () => {
        Validations.Numerical("foo", "").should.be.false;
    });

    it("add to errors when value is undefined", () => {
        Validations.Numerical("foo", undefined).should.be.false;
    });

    it("add to errors when value is null", () => {
        Validations.Numerical("foo", null).should.be.false;
    });

    it("don't add to errors when value is a number", () => {
        Validations.Numerical("foo", 100).should.be.true;
    });

    it("don't accept partial numbers", () => {
        Validations.Numerical("foo", "100foo").should.be.false;
    });

    it("accept 0 as a proper value", () => {
        Validations.Numerical("foo", 0).should.be.true;
    });

    it("consider a negative number as valid", () => {
        Validations.Numerical("foo", -10.75).should.be.true;
    });
});
