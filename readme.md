# n-validators
JavaScript valiators.

[![Build Status](https://travis-ci.org/AlexanderMac/n-validators.svg?branch=master)](https://travis-ci.org/AlexanderMac/n-validators)

### Commands

```sh
# Install
$ npm i -S n-validators
```

### Usage
```js
let validators = require('validators');

let r1 = validators.isValidId(11);
let r2 = validators.isValidId('invalid id');

console.log(r1, r2); // => true false
```

### API

- **isValidDateString(value)**<br>
Returns `true` if `value` is a correct date string.

- **isNotEmptyString(value)**<br>
Returns `true` if `value` is not empty string.

- **isValidId(value)**<br>
Returns `true` if `value` is a correct id (positive number).

- **isAllValidId(items)**<br>
Returns `true` if `items` is an array with all the elements with the correct id.

- **isAllValidUniqueId(items)**<br>
Returns `true` if `items` is an array with all the elements with the correct, unique id.

- **isValidObjectId(value)**<br>
Returns `true` if `value` is a correct ObjectId.

- **isAllValidObjectId(items)**<br>
Returns `true` if `items` is an array with all the elements with the correct ObjectId.

- **isAllValidUniqueObjectId(items)**<br>
Returns `true` if `items` is an array with all the elements with the correct, unique ObjectId.

- **isAllValidObjectIdOrNull(items)**<br>
Returns `true` if `items` is an array with all the elements with the correct ObjectId or null.

- **isAllValidUniqueObjectIdOrNull(items)**<br>
Returns `true` if `items` is an array with all the elements with the correct, unique ObjectId or null.

- **isValidEmail(value)**<br>
Returns `true` if `value` is a correct email.

- **isValidPhoneSimple(value)**<br>
Returns `true` if `value` is a correct phone (a string with digits started from `+`).

- **isAllAllowed(checked, allowed)**<br> 
Returns `true` if `checked` is an array with all the elements from `allowed`.

- **isAllUniqueAllowed(checked, allowed)**<br>
Returns `true` if `checked` is an array of unique elements with all the elements from `allowed`.

- **isAllowedStringFields(checked, allowed)**<br>
Returns `true` if `checked` is a string of fields separated by space with all the fields from `allowed`.


### Author
Alexander Mac

### Licence
Licensed under the MIT license.
