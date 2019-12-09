'use strict';

const internationalization = {
    "en-US": {
        nameMissing: "Name can't be blank",
        priceNotNumber: "Price must be a number"
    },
    "hi": {
        nameMissing: "नाम खाली नहीं हो सकता",
        priceNotNumber: "मूल्य एक संख्या होनी चाहिए"
    }
};

const i18l = function(message, language) {
    if (language) {
        return internationalization[language][message];
    }
    return function (language) {
        return internationalization[language][message];
    };
};

module.exports.i18l = i18l;
