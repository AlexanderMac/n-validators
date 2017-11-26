'use strict';

const moment     = require('moment');
const should     = require('should');
const sinon      = require('sinon');
const validators = require('../src/validators');

const DEFAULT_ALLOWED = ['a', 'b', 'c'];

describe('validations', () => {
  describe('isDateString', () => {
    function registerTest(testName, value, expected) {
      it(testName, () => {
        let actual = validators.isDateString(value);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when val is undefined', undefined, false);
    registerTest('should return false when val is null', null, false);
    registerTest('should return false when val is a boolean and equals false', false, false);
    registerTest('should return false when val is a boolean and equals true', true, false);
    registerTest('should return false when val is a negative number', -1, false);
    registerTest('should return false when val is a number and equals to zero', 0, false);
    registerTest('should return false when val is a positive number', 123, false);
    registerTest('should return false when val is an object', {}, false);
    registerTest('should return false when val is an array', [1, 2, 3], false);
    registerTest('should return false when val is Date object', new Date(), false);
    registerTest('should return false when val is Moment object', moment(), false);
    registerTest('should return false when val is a wrong date string', 'string', false);
    registerTest('should return true when val is a valid date string', '2016-01-01T00:00:00Z', true);
  });

  describe('isNotEmptyString', () => {
    function registerTest(testName, value, expected) {
      it(testName, () => {
        let actual = validators.isNotEmptyString(value);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when val is undefined', undefined, false);
    registerTest('should return false when val is null', null, false);
    registerTest('should return false when val is a boolean and equals false', false, false);
    registerTest('should return false when val is a boolean and equals true', true, false);
    registerTest('should return false when val is a negative number', -1, false);
    registerTest('should return false when val is a number and equals to zero', 0, false);
    registerTest('should return false when val is a positive number', 123, false);
    registerTest('should return false when val is Date object', new Date(), false);
    registerTest('should return false when val is an object', {}, false);
    registerTest('should return false when val is an array', [1, 2, 3], false);
    registerTest('should return false when val is an empty string', '', false);
    registerTest('should return true when val isn\'t an empty string', 'not empty string', true);
  });

  describe('isId', () => {
    function registerTest(testName, value, expected) {
      it(testName, () => {
        let actual = validators.isId(value);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when val is undefined', undefined, false);
    registerTest('should return false when val is null', null, false);
    registerTest('should return false when val is a boolean and equals false', false, false);
    registerTest('should return false when val is a boolean and equals true', true, false);
    registerTest('should return false when val is Date object', new Date(), false);
    registerTest('should return false when val is an object', {}, false);
    registerTest('should return false when val is an array', [1, 2, 3], false);
    registerTest('should return false when val is an empty string', '', false);
    registerTest('should return false when val isn\'t an empty string', 'not empty string', false);
    registerTest('should return false when val is a negative number', -1, false);
    registerTest('should return false when val is a number and equals to zero', 0, false);
    registerTest('should return true when val is a positive number', 123, true);
  });

  describe('everyIsId', () => {
    function registerTest(testName, items, expected) {
      it(testName, () => {
        let actual = validators.everyIsId(items);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when items is undefined', undefined, false);
    registerTest('should return false when items is null', null, false);
    registerTest('should return false when items is a boolean and equals false', false, false);
    registerTest('should return false when items is a boolean and equals true', true, false);
    registerTest('should return false when items is a negative number', -1, false);
    registerTest('should return false when items is a number and equals to zero', 0, false);
    registerTest('should return false when items is a positive number', 123, false);
    registerTest('should return false when items is Date object', new Date(), false);
    registerTest('should return false when items is an object', {}, false);
    registerTest('should return false when items is an empty string', '', false);
    registerTest('should return false when items isn\'t an empty string', 'not empty string', false);
    registerTest('should return false when items is an array with some invalid ids', [1, 'invalid id', 3], false);
    registerTest('should return true when items is an empty array', [], true);
    registerTest('should return true when items is an array with all valid ids', [1, 2, 3], true);
  });

  describe('everyIsUniqueId', () => {
    beforeEach(() => {
      sinon.stub(validators, 'everyIsId');
    });

    afterEach(() => {
      validators.everyIsId.restore();
    });

    it('should call everyIsId and pass parameters', () => {
      let value = [1, 2, 3];

      validators
        .everyIsId
        .withArgs(value)
        .returns(true);

      let actual = validators.everyIsUniqueId(value);
      should(actual).equal(true);
    });

    it('should return false when items is an array with valid ids, but has duplicates', () => {
      let value = [1, 2, 2];

      validators
        .everyIsId
        .withArgs(value)
        .returns(true);

      let actual = validators.everyIsUniqueId(value);
      should(actual).equal(false);
    });
  });

  describe('isObjectId', () => {
    function registerTest(testName, value, expected) {
      it(testName, () => {
        let actual = validators.isObjectId(value);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when items is undefined', undefined, false);
    registerTest('should return false when items is null', null, false);
    registerTest('should return false when items is a boolean and equals false', false, false);
    registerTest('should return false when items is a boolean and equals true', true, false);
    registerTest('should return false when items is a negative number', -1, false);
    registerTest('should return false when items is a number and equals to zero', 0, false);
    registerTest('should return false when items is a positive number', 123, false);
    registerTest('should return false when items is Date object', new Date(), false);
    registerTest('should return false when items is an object', {}, false);
    registerTest('should return false when items is an array', [1, 2, 3], false);
    registerTest('should return false when items is an empty string', '', false);
    registerTest('should return false when items is a string with an invalid ObjectId', 'invalid id', false);
    registerTest('should return true when items is a string with a valid ObjectId', '0123456789abcdefABCDEF00', true);
  });

  describe('everyIsObjectId', () => {
    function registerTest(testName, value, expected) {
      it(testName, () => {
        let actual = validators.everyIsObjectId(value);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when items is undefined', undefined, false);
    registerTest('should return false when items is null', null, false);
    registerTest('should return false when items is a boolean and equals false', false, false);
    registerTest('should return false when items is a boolean and equals true', true, false);
    registerTest('should return false when items is a negative number', -1, false);
    registerTest('should return false when items is a number and equals to zero', 0, false);
    registerTest('should return false when items is a positive number', 123, false);
    registerTest('should return false when items is Date object', new Date(), false);
    registerTest('should return false when items is an object', {}, false);
    registerTest('should return false when items is an empty string', '', false);
    registerTest('should return false when items isn\'t an empty string', 'not empty string', false);
    registerTest('should return false when items is an array with some invalid ObjectIds',
      ['0123456789abcdefABCDEF00', 'invalid id', '0123456789abcdefABCDEF00'],
      false
    );
    registerTest('should return true when items is an empty array', [], true);
    registerTest('should return true when items is an array with valid ObjectIds',
      ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF11', '0123456789abcdefABCDEF22'],
      true
    );
  });

  describe('everyIsUniqueObjectId', () => {
    beforeEach(() => {
      sinon.stub(validators, 'everyIsObjectId');
    });

    afterEach(() => {
      validators.everyIsObjectId.restore();
    });

    it('should call everyIsObjectId and pass parameters', () => {
      let value = ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF11', '0123456789abcdefABCDEF22'];

      validators
        .everyIsObjectId
        .withArgs(value)
        .returns(true);

      let actual = validators.everyIsUniqueObjectId(value);
      should(actual).equal(true);
    });

    it('should return false when items is an array with valid ids, but has duplicates', () => {
      let value = ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF22', '0123456789abcdefABCDEF22'];

      validators
        .everyIsObjectId
        .withArgs(value)
        .returns(true);

      let actual = validators.everyIsUniqueObjectId(value);
      should(actual).equal(false);
    });
  });

  describe('everyIsObjectIdOrNull', () => {
    function registerTest(testName, value, expected) {
      it(testName, () => {
        let actual = validators.everyIsObjectIdOrNull(value);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when items is undefined', undefined, false);
    registerTest('should return false when items is null', null, false);
    registerTest('should return false when items is a boolean and equals false', false, false);
    registerTest('should return false when items is a boolean and equals true', true, false);
    registerTest('should return false when items is a negative number', -1, false);
    registerTest('should return false when items is a number and equals to zero', 0, false);
    registerTest('should return false when items is a positive number', 123, false);
    registerTest('should return false when items is Date object', new Date(), false);
    registerTest('should return false when items is an object', {}, false);
    registerTest('should return false when items is an empty string', '', false);
    registerTest('should return false when items isn\'t an empty string', 'not empty string', false);
    registerTest('should return false when items is an array with some invalid ObjectIds',
      ['0123456789abcdefABCDEF00', 'invalid id', '0123456789abcdefABCDEF00'],
      false
    );
    registerTest('should return true when items is an empty array', [], true);
    registerTest('should return true when items is an array with valid ObjectIds',
      ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF11', '0123456789abcdefABCDEF22'],
      true
    );
    registerTest('should return true when items is an array with valid ObjectIds and nulls',
      ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF11', null],
      true
    );
  });

  describe('everyIsUniqueObjectIdOrNull', () => {
    beforeEach(() => {
      sinon.stub(validators, 'everyIsObjectIdOrNull');
    });

    afterEach(() => {
      validators.everyIsObjectIdOrNull.restore();
    });

    it('should call everyIsObjectIdOrNull and pass parameters', () => {
      let value = ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF11', null];

      validators
        .everyIsObjectIdOrNull
        .withArgs(value)
        .returns(true);

      let actual = validators.everyIsUniqueObjectIdOrNull(value);
      should(actual).equal(true);
    });

    it('should return false when items is an array with valid ids, but has duplicates', () => {
      let value = ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF22', '0123456789abcdefABCDEF22', null, null];

      validators
        .everyIsObjectIdOrNull
        .withArgs(value)
        .returns(true);

      let actual = validators.everyIsUniqueObjectIdOrNull(value);
      should(actual).equal(false);
    });
  });

  describe('isEmail', () => {
    function registerTest(testName, value, expected) {
      it(testName, () => {
        let actual = validators.isEmail(value);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when val is undefined', undefined, false);
    registerTest('should return false when val is null', null, false);
    registerTest('should return false when val is a boolean and equals false', false, false);
    registerTest('should return false when val is a boolean and equals true', true, false);
    registerTest('should return false when val is a negative number', -1, false);
    registerTest('should return false when val is a number and equals to zero', 0, false);
    registerTest('should return false when val is a positive number', 123, false);
    registerTest('should return false when val is Date object', new Date(), false);
    registerTest('should return false when val is an object', {}, false);
    registerTest('should return false when val is an array', [1, 2, 3], false);
    registerTest('should return false when val is an empty string', '', false);
    registerTest('should return false when val is a string with an invalid email', 'invalid email', false);
    registerTest('should return true when val is a string with a valid email', 'valid-email@mail.com', true);
  });

  describe('isSimplePhoneNumber', () => {
    function registerTest(testName, value, expected) {
      it(testName, () => {
        let actual = validators.isSimplePhoneNumber(value);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when val is undefined', undefined, false);
    registerTest('should return false when val is null', null, false);
    registerTest('should return false when val is a boolean and equals false', false, false);
    registerTest('should return false when val is a boolean and equals true', true, false);
    registerTest('should return false when val is a negative number', -1, false);
    registerTest('should return false when val is a number and equals to zero', 0, false);
    registerTest('should return false when val is a positive number', 123, false);
    registerTest('should return false when val is Date object', new Date(), false);
    registerTest('should return false when val is an object', {}, false);
    registerTest('should return false when val is an array', [1, 2, 3], false);
    registerTest('should return false when val is an empty string', '', false);
    registerTest('should return false when val is a string with length less than 8 chars', '12345', false);
    registerTest('should return false when val is a string and starts not from +', '12345678', false);
    registerTest('should return true when val is a string with a valid phone', '+12345678', true);
  });

  describe('everyIsAllowed', () => {
    function registerTest(testName, items, expected) {
      it(testName, () => {
        let actual = validators.everyIsAllowed(items, DEFAULT_ALLOWED);
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when items is undefined', undefined, false);
    registerTest('should return false when items is null', null, false);
    registerTest('should return false when items is a boolean and equals false', false, false);
    registerTest('should return false when items is a boolean and equals true', true, false);
    registerTest('should return false when items is a negative number', -1, false);
    registerTest('should return false when items is a number and equals to zero', 0, false);
    registerTest('should return false when items is a positive number', 123, false);
    registerTest('should return false when items is Date object', new Date(), false);
    registerTest('should return false when items is an object', {}, false);
    registerTest('should return false when items is an empty string', '', false);
    registerTest('should return false when items isn\'t an empty string', 'not empty string', false);
    registerTest('should return false when items is an array with some node allowed items', ['a', 'b', 'd'], false);
    registerTest('should return true when items is an empty array', [], true);
    registerTest('should return true when items is an array with all allowed items', ['a', 'b'], true);
  });

  describe('everyIsUniqueAllowed', () => {
    beforeEach(() => {
      sinon.stub(validators, 'everyIsAllowed');
    });

    afterEach(() => {
      validators.everyIsAllowed.restore();
    });

    it('should call everyIsAllowed and pass parameters', () => {
      let value = ['a', 'b', 'c'];

      validators
        .everyIsAllowed
        .withArgs(value, DEFAULT_ALLOWED)
        .returns(true);

      let actual = validators.everyIsUniqueAllowed(value, DEFAULT_ALLOWED);
      should(actual).equal(true);
    });

    it('should return false when checked is an array with valid ids, but has duplicates', () => {
      let value = ['a', 'b', 'b'];

      validators
        .everyIsAllowed
        .withArgs(value, DEFAULT_ALLOWED)
        .returns(true);

      let actual = validators.everyIsUniqueAllowed(value, DEFAULT_ALLOWED);
      should(actual).equal(false);
    });
  });

  describe('isFieldsString', () => {
    function registerTest(testName, checked, expected) {
      it(testName, () => {
        let actual = validators.isFieldsString(checked, DEFAULT_ALLOWED.join(' '));
        should(actual).equal(expected);
      });
    }

    registerTest('should return false when checked is undefined', undefined, false);
    registerTest('should return false when checked is null', null, false);
    registerTest('should return false when checked is a boolean and equals false', false, false);
    registerTest('should return false when checked is a boolean and equals true', true, false);
    registerTest('should return false when checked is a negative number', -1, false);
    registerTest('should return false when checked is a number and equals to zero', 0, false);
    registerTest('should return false when checked is a positive number', 123, false);
    registerTest('should return false when checked is Date object', new Date(), false);
    registerTest('should return false when checked is an object', {}, false);
    registerTest('should return false when checked is an array', [1, 2, 3], false);
    registerTest('should return false when checked is a string with invalid fields', 'ab', false);
    registerTest('should return true when checked is an empty string', '', true);
    registerTest('should return true when checked is a string with valid space separated fields', 'a b c', true);
  });
});
