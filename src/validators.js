'use strict';

const _      = require('lodash');
const moment = require('moment');

class Validators {
  isDateString(val, format) {
    return _.isString(val) && moment(val, format || moment.defaultFormat).isValid();
  }

  isNotEmptyString(val) {
    return _.isString(val) && val.length > 0;
  }

  isId(val) {
    return _.isNumber(val) && val > 0;
  }

  everyIsId(items) {
    return _.isArray(items) && _.every(items, this.isId);
  }

  everyIsUniqueId(items) {
    return this.everyIsId(items) && _.uniq(items).length === items.length;
  }

  isObjectId(val) {
    let regexp = /^[0-9a-fA-F]{24}$/;
    return _.isString(val) && regexp.test(val);
  }

  everyIsObjectId(items) {
    return _.isArray(items) && _.every(items, this.isObjectId);
  }

  everyIsUniqueObjectId(items) {
    return this.everyIsObjectId(items) && _.uniq(items).length === items.length;
  }

  everyIsObjectIdOrNull(items) {
    return _.isArray(items) && _.every(items, id => _.isNull(id) || this.isObjectId(id));
  }

  everyIsUniqueObjectIdOrNull(items) {
    return this.everyIsObjectIdOrNull(items) &&
         _.chain(items).compact().uniq().value().length === _.compact(items).length;
  }

  isEmail(val) {
    let regexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return _.isString(val) && regexp.test(val);
  }

  isSimplePhoneNumber(val) {
    return _.isString(val) && val.length >= 8 && _.startsWith(val, '+');
  }

  everyIsAllowed(items, allowed) {
    return _.isArray(items) && _.difference(items, allowed).length === 0;
  }

  everyIsUniqueAllowed(items, allowed) {
    return this.everyIsAllowed(items, allowed) && _.uniq(items).length === items.length;
  }

  isFieldsString(val, allowed) {
    if (!_.isString(val)) {
      return false;
    }
    if (_.isEmpty(val)) {
      return true;
    }
    let valAttrs = val.split(' ');
    let allowedAttrs = allowed.split(' ');
    return _.difference(valAttrs, allowedAttrs).length === 0;
  }
}

module.exports = new Validators();
