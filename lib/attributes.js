"use strict";

var Validations = require('./validations').Validations;

var Attributes = function(attributes) {
    this.attributes = attributes || {};
    this.errors = [];
};

Attributes.prototype = {
    get: function(property) {
        return this.attributes[property].value;
    },

    set: function(property, value) {
        this.attributes[property] = { value: value }
    },

    validate: function() {
        var key, value;
        this.errors = [];
        for (key in this.attributes) {
            if (this.attributes.hasOwnProperty(key)) {
                value = this.attributes[key];
                if (value.mandatory) {
                    Validations.Mandatory(key, value.value, this.errors);
                }
                if (value.numerical) {
                    Validations.Numerical(key, value.value, this.errors);
                }
            }
        }
        return this.errors;
    }
};

Attributes.Driven = {
    get: function(property) {
        return this.attributes.get(property);
    },

    set: function(property, value) {
        this.__validated__ = false;
        return this.attributes.set(property, value);
    },

    validate: function() {
        if (!this.__validated__) {
            this.__validated__ = true;
            this.attributes.validate();
        }
    },

    isValid: function() {
        this.validate();
        return this.attributes.errors.length === 0;
    },

    errors: function() {
        this.validate();
        return this.attributes.errors;
    },

    isValidated: function() {
        return this.__validated__ === true;
    }
};

module.exports.Attributes = Attributes;
