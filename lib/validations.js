"use strict";

var Validations = {};

Validations.Mandatory = function(key, value) {
    return (value === undefined || value === null || value === "") ? false : true;
};

Validations.Numerical = function(key, value) {
    return (isNaN(parseFloat(value)) || !isFinite(value)) ? false : true;
};

module.exports.Validations = Validations;
