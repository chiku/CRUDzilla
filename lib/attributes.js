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
        };

    clear();

    return {
        add: add,
        all: all,
        clear: clear
    };
}

var Attributes = function(attributes) {
    attributes = attributes || {};
    var errors = new Errors(),

        get = function(property) {
            return attributes[property].value;
        },

        set = function(property, value) {
            attributes[property] = {
                value: value
            }
        },

        validate = function() {
            var key, value;
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

            return errors.all();
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
