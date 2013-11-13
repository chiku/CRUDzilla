"use strict";

var should = require("should"),
    extensions = require("../lib/extensions");

describe("String", function() {
    describe("#capitalize", function() {
        it("converts first character to upper with everything else as small", function() {
            "soMe Sentence".capitalize().should.equal("Some sentence");
        });

        it("handles empty sentences", function() {
            "".capitalize().should.equal("");
        });

        it("handles sentences with one letter", function() {
            "i".capitalize().should.equal("I");
        });
    });
});
