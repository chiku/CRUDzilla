"use strict";

var extensions = require('./extensions')
  , Internationalization = require('./internationalization').Internationalization;

var Validations = {};

Validations.Mandatory = function(key, value, errors) {
    if (value === undefined || value === null || value === "") {
        errors.push(Internationalization.missingAttribute.replace('#<>', key.capitalize()));
    }
};

Validations.Numerical = function(key, value, errors) {
    if (isNaN(parseFloat(value)) || !isFinite(value)) {
        errors.push(Internationalization.notNumerical.replace('#<>', key.capitalize()));
    }
};

module.exports.Validations = Validations;
