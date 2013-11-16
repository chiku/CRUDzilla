"use strict";

var Validations = require('./validations').Validations,
    i18l = require('./internationalization').i18l,
    _ = require('lodash');

var Errors = function(error) {
    var errors,

        add = function(error) {
            errors.push({
                attribute: error.attribute,
                value: error.value,
                message: i18l(error.errorKey)("en-US")
            });
        },

        clear = function() {
            errors = [];
        },

        all = function() {
            return errors;
        },

        isPresent = function() {
            return errors.length > 0;
        };

    clear();

    return {
        add: add,
        all: all,
        isPresent: isPresent,
        clear: clear
    };
}

var Attributes = function(attributes) {
    attributes = attributes || {};
    var errors = new Errors(),
        validated = false,

        get = function(property) {
            return attributes[property].value;
        },

        set = function(property, value) {
            validated = false;
            attributes[property] = {
                value: value
            }
        },

        validate = function() {
            var key, value;
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
        };

    return {
        get: get,
        set: set,
        errors: allErrors,
        isValid: isValid,
        isValidated: isValidated
    }
};

Attributes.Driven = {
    get: function(property) {
        return this.attributes.get(property);
    },

    set: function(property, value) {
        return this.attributes.set(property, value);
    },

    isValid: function() {
        return this.attributes.errors().length === 0;
    },

    errors: function() {
        return this.attributes.errors();
    }
};

module.exports.Attributes = Attributes;
