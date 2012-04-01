"use strict";

var should     = require("should")
  , extensions = require("../lib/extensions"); 

module.exports = {
    "String#capitalize converts first character to upper with everything else as small": function() {
        "soMe Sentence".capitalize().should.equal("Some sentence");
    },

    "String#capitalize handles empty sentences": function() {
        "".capitalize().should.equal("");
    },

    "String#capitalize handles sentences with one letter": function() {
        "i".capitalize().should.equal("I");
    }
};