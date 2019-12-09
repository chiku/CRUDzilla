'use strict';

const { Validations } = require('./validations');
const { Errors } = require('./errors');

var Attributes = function(attributes = {}) {
    const errors = new Errors();
    let validated = false;

    const validate = function() {
        validated = true;
        errors.clear();

        Object.keys(attributes).forEach(function(key) {
            const value = attributes[key];
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
    };

    const validateIfDirty = function() {
        if (!validated) {
            validate();
        }
    };

    const allErrors = function() {
        validateIfDirty();
        return errors.all();
    };

    const isValid = function() {
        validateIfDirty();
        return !errors.isPresent();
    };

    const isValidated = function() {
        return validated;
    };

    const obj = {
        errors: allErrors,
        isValid: isValid,
        isValidated: isValidated
    };

    Object.keys(attributes).forEach(function(key) {
        var value = attributes[key];
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
