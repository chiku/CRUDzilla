"use strict";

var _ = require('lodash'),
    Validations = require('./validations').Validations,
    Errors = require('./errors').Errors;

var Attributes = function(attributes) {
    attributes = attributes || {};
    var errors = new Errors(),
        validated = false,

        validate = function() {
            validated = true;
            errors.clear();

            _(attributes).each(function(value, key) {
                if (value.mandatory && !Validations.Mandatory(key, value.value)) {
                    errors.add({
                        attribute: key,
                        value: value.value,
                        errorKey: "nameMissing"
                    });
                }

                if (value.numerical && !Validations.Numerical(key, value.value)) {
                    errors.add({
                        attribute: key,
                        value: value.value,
                        errorKey: "priceNotNumber"
                    });
                }

            });
        },

        validateIfDirty = function() {
            if (!validated) {
                validate();
            }
        },

        allErrors = function() {
            validateIfDirty();
            return errors.all();
        },

        isValid = function() {
            validateIfDirty();
            return !errors.isPresent();
        },

        isValidated = function() {
            return validated;
        },

        obj = {
            errors: allErrors,
            isValid: isValid,
            isValidated: isValidated
        };

    _(attributes).each(function(value, key) {
        Object.defineProperty(obj, key, {
            get: function() {
                return attributes[key].value;
            },
            set: function(value) {
                validated = false;
                attributes[key].value = value;
            }
        });
    });

    return obj;
};

module.exports.Attributes = Attributes;
