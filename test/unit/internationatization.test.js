'use strict';

const should = require("should");

const { i18l } = require("../../lib/internationalization");

describe("Internationalization", () => {
    describe("when referred by token and language", () => {
        it("fetches the token for the language", () => {
            i18l("nameMissing", "en-US").should.equal("Name can't be blank");
        });
    });

    describe("when referred by token", () => {
        it("returns a function that can return the tokens for a language", () =>{
            i18l("priceNotNumber")("hi").should.equal("मूल्य एक संख्या होनी चाहिए");
        });
    });
});
