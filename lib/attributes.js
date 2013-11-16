"use strict";

var Validations = require('./validations').Validations,
    i18l = require('./internationalization').i18l;

var Attributes = function(attributes) {
    attributes = attributes || {};
    var errors = [];

    var get = function(property) {
        return attributes[property].value;
    };

    var set = function(property, value) {
        attributes[property] = {
            value: value
        }
    };

    var validate = function() {
        var key, value;
        errors = [];

        for (key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                value = attributes[key];

                if (value.mandatory && !Validations.Mandatory(key, value.value)) {
                    errors.push({
                        attribute: key,
                        value: value.value,
                        message: i18l("nameMissing", "en-US")
                    });
                }

                if (value.numerical && !Validations.Numerical(key, value.value)) {
                    errors.push({
                        attribute: key,
                        value: value.value,
                        message: i18l("priceNotNumber", "en-US")
                    });
                }
            }
        }

        return errors;
    };

    return {
        get: get,
        set: set,
        errors: validate
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
