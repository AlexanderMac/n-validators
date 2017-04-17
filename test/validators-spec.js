'use strict';

let moment     = require('moment');
let should     = require('should');
let sinon      = require('sinon');
let validators = require('../lib/validators');

const DEFAULT_ALLOWED = ['a', 'b', 'c'];

describe('validations', () => {
  describe('isValidDateString', () => {
    let registerTest = (testName, value, expected) => {
      it(testName, () => {
        let actual = validators.isValidDateString(value);
        should(actual).equal(expected);
      });
    };

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
    let registerTest = (testName, value, expected) => {
      it(testName, () => {
        let actual = validators.isNotEmptyString(value);
        should(actual).equal(expected);
      });
    };

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

  describe('isValidId', () => {
    let registerTest = (testName, value, expected) => {
      it(testName, () => {
        let actual = validators.isValidId(value);
        should(actual).equal(expected);
      });
    };

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

  describe('isAllValidId', () => {
    let registerTest = (testName, items, expected) => {
      it(testName, () => {
        let actual = validators.isAllValidId(items);
        should(actual).equal(expected);
      });
    };

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

  describe('isAllValidUniqueId', () => {
    beforeEach(() => {
      sinon.stub(validators, 'isAllValidId');
    });

    afterEach(() => {
      validators.isAllValidId.restore();
    });

    it('should call isAllValidId and pass parameters', () => {
      let value = [1, 2, 3];

      validators
        .isAllValidId
        .withArgs(value)
        .returns(true);
      
      let actual = validators.isAllValidUniqueId(value);
      should(actual).equal(true);
    });

    it('should return false when items is an array with valid ids, but has duplicates', () => {
      let value = [1, 2, 2];

      validators
        .isAllValidId
        .withArgs(value)
        .returns(true);
      
      let actual = validators.isAllValidUniqueId(value);
      should(actual).equal(false);
    });
  });

  describe('isValidObjectId', () => {
    let registerTest = (testName, value, expected) => {
      it(testName, () => {
        let actual = validators.isValidObjectId(value);
        should(actual).equal(expected);
      });
    };

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

  describe('isAllValidObjectId', () => {
    let registerTest = (testName, value, expected) => {
      it(testName, () => {
        let actual = validators.isAllValidObjectId(value);
        should(actual).equal(expected);
      });
    };

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

  describe('isAllValidUniqueObjectId', () => {
    beforeEach(() => {
      sinon.stub(validators, 'isAllValidObjectId');
    });

    afterEach(() => {
      validators.isAllValidObjectId.restore();
    });

    it('should call isAllValidObjectId and pass parameters', () => {
      let value = ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF11', '0123456789abcdefABCDEF22'];

      validators
        .isAllValidObjectId
        .withArgs(value)
        .returns(true);
      
      let actual = validators.isAllValidUniqueObjectId(value);
      should(actual).equal(true);
    });

    it('should return false when items is an array with valid ids, but has duplicates', () => {
      let value = ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF22', '0123456789abcdefABCDEF22'];

      validators
        .isAllValidObjectId
        .withArgs(value)
        .returns(true);
      
      let actual = validators.isAllValidUniqueObjectId(value);
      should(actual).equal(false);
    });
  });

  describe('isAllValidObjectIdOrNull', () => {
    let registerTest = (testName, value, expected) => {
      it(testName, () => {
        let actual = validators.isAllValidObjectIdOrNull(value);
        should(actual).equal(expected);
      });
    };

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

  describe('isAllValidUniqueObjectIdOrNull', () => {
    beforeEach(() => {
      sinon.stub(validators, 'isAllValidObjectIdOrNull');
    });

    afterEach(() => {
      validators.isAllValidObjectIdOrNull.restore();
    });

    it('should call isAllValidObjectIdOrNull and pass parameters', () => {
      let value = ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF11', null];

      validators
        .isAllValidObjectIdOrNull
        .withArgs(value)
        .returns(true);
      
      let actual = validators.isAllValidUniqueObjectIdOrNull(value);
      should(actual).equal(true);
    });

    it('should return false when items is an array with valid ids, but has duplicates', () => {
      let value = ['0123456789abcdefABCDEF00', '0123456789abcdefABCDEF22', '0123456789abcdefABCDEF22', null, null];

      validators
        .isAllValidObjectIdOrNull
        .withArgs(value)
        .returns(true);
      
      let actual = validators.isAllValidUniqueObjectIdOrNull(value);
      should(actual).equal(false);
    });
  });

  describe('isValidEmail', () => {
    let registerTest = (testName, value, expected) => {
      it(testName, () => {
        let actual = validators.isValidEmail(value);
        should(actual).equal(expected);
      });
    };

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

  describe('isValidPhone', () => {
    let registerTest = (testName, value, expected) => {
      it(testName, () => {
        let actual = validators.isValidPhone(value);
        should(actual).equal(expected);
      });
    };

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

  describe('isAllAllowed', () => {
    let registerTest = (testName, checked, expected) => {
      it(testName, () => {
        let actual = validators.isAllAllowed(checked, DEFAULT_ALLOWED);
        should(actual).equal(expected);
      });
    };

    registerTest('should return false when checked is undefined', undefined, false);
    registerTest('should return false when checked is null', null, false);
    registerTest('should return false when checked is a boolean and equals false', false, false);
    registerTest('should return false when checked is a boolean and equals true', true, false);
    registerTest('should return false when checked is a negative number', -1, false);
    registerTest('should return false when checked is a number and equals to zero', 0, false);
    registerTest('should return false when checked is a positive number', 123, false);
    registerTest('should return false when checked is Date object', new Date(), false);
    registerTest('should return false when checked is an object', {}, false);
    registerTest('should return false when checked is an empty string', '', false);
    registerTest('should return false when checked isn\'t an empty string', 'not empty string', false);
    registerTest('should return false when checked is an array with some node allowed items', ['a', 'b', 'd'], false);
    registerTest('should return true when checked is an empty array', [], true);
    registerTest('should return true when checked is an array with all allowed items', ['a', 'b'], true);
  });

  describe('isAllUniqueAllowed', () => {
    beforeEach(() => {
      sinon.stub(validators, 'isAllAllowed');
    });

    afterEach(() => {
      validators.isAllAllowed.restore();
    });

    it('should call isAllAllowed and pass parameters', () => {
      let value = ['a', 'b', 'c'];

      validators
        .isAllAllowed
        .withArgs(value, DEFAULT_ALLOWED)
        .returns(true);
      
      let actual = validators.isAllUniqueAllowed(value, DEFAULT_ALLOWED);
      should(actual).equal(true);
    });

    it('should return false when checked is an array with valid ids, but has duplicates', () => {
      let value = ['a', 'b', 'b'];

      validators
        .isAllAllowed
        .withArgs(value, DEFAULT_ALLOWED)
        .returns(true);
      
      let actual = validators.isAllUniqueAllowed(value, DEFAULT_ALLOWED);
      should(actual).equal(false);
    });
  });

  describe('isAllowedStringFields', () => {
    let registerTest = (testName, checked, expected) => {
      it(testName, () => {
        let actual = validators.isAllowedStringFields(checked, DEFAULT_ALLOWED.join(' '));
        should(actual).equal(expected);
      });
    };

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
