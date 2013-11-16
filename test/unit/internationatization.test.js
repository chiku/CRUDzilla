"use strict";

var should = require("should"),
    i18l = require("../../lib/internationalization").i18l;

describe("Internationalization", function() {
    describe("when referred by token and language", function() {
        it("fetches the token for the language", function() {
            i18l("nameMissing", "en-US").should.equal("Name can't be blank");
        });
    });

    describe("when referred by token", function() {
        it("returns a function that can return the tokens for a language", function(){
            i18l("priceNotNumber")("hi").should.equal("मूल्य एक संख्या होनी चाहिए");
        });
    });
});
