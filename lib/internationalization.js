var internationalization = {
    "en-US": {
        missingAttribute: "#<> can't be blank",
        notNumerical: "#<> must be a number",
        nameMissing: "Name can't be blank",
        priceNotNumber: "Price must be a numer"
    },
    "hi": {
        missingAttribute: "#<> खाली नहीं हो सकता",
        notNumerical: "#<> एक संख्या होनी चाहिए",
        nameMissing: "नाम खाली नहीं हो सकता",
        priceNotNumber: "मूल्य एक संख्या होनी चाहिए"
    }
};

var defaultLanguage = "en-US";

var i18l = function(message, language) {
    if (language) {
        return internationalization[language][message];
    }
    return function (language) {
        return internationalization[language][message];
    }
};

module.exports.Internationalization = internationalization[defaultLanguage];
module.exports.i18l = i18l;
