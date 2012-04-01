var Internationalization = {
	en: {
		missingAttribute: "#<> can't be blank",
		notNumerical: "#<> must be a number"
	}
};

var language = "en";

module.exports.Internationalization = Internationalization[language];
