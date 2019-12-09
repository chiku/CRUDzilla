'use strict';

const i18l = require('./internationalization').i18l;

const Errors = function() {
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
};

module.exports.Errors = Errors;
