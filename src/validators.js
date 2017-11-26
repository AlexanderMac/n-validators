'use strict';

let _      = require('lodash');
let moment = require('moment');

module.exports = {
  isValidDateString: function(val) {
    return _.isString(val) && moment(val, moment.defaultFormat).isValid();
  },
  isNotEmptyString: function(val) {
    return _.isString(val) && val.length > 0;
  },
  isValidId: function(val) {
    return _.isNumber(val) && val > 0;
  },
  isAllValidId: function(items) {
    return _.isArray(items) && _.every(items, this.isValidId);
  },
  isAllValidUniqueId: function(items) {
    return this.isAllValidId(items) && _.uniq(items).length === items.length;
  },
  isValidObjectId: function(val) {
    let regexp = /^[0-9a-fA-F]{24}$/;
    return _.isString(val) && regexp.test(val);
  },
  isAllValidObjectId: function(items) {
    return _.isArray(items) && _.every(items, this.isValidObjectId);
  },
  isAllValidUniqueObjectId: function(items) {
    return this.isAllValidObjectId(items) && _.uniq(items).length === items.length;
  },
  isAllValidObjectIdOrNull: function(items) {
    let self = this;
    return _.isArray(items) && _.every(items, id => _.isNull(id) || self.isValidObjectId(id));
  },
  isAllValidUniqueObjectIdOrNull: function(items) {
    return this.isAllValidObjectIdOrNull(items) &&
         _.chain(items).compact().uniq().value().length === _.compact(items).length;
  },
  isValidEmail: function(val) {
    let regexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return _.isString(val) && regexp.test(val);
  },
  isValidPhoneSimple: function(val) {
    return _.isString(val) && val.length >= 8 && _.startsWith(val, '+');
  },
  isAllAllowed: function(checked, allowed) {
    return _.isArray(checked) && _.difference(checked, allowed).length === 0;
  },
  isAllUniqueAllowed: function(checked, allowed) {
    return this.isAllAllowed(checked, allowed) && _.uniq(checked).length === checked.length;
  },
  isAllowedStringFields: function(checked, allowed) {
    if (!_.isString(checked)) {
      return false;
    }
    if (!checked) {
      return true;
    }
    let checkedFields = checked.split(' ');
    let allowedFields = allowed.split(' ');
    return _.difference(checkedFields, allowedFields).length === 0;
  }
};
