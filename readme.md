# n-validators
JavaScript valiators.

[![Build Status](https://travis-ci.org/AlexanderMac/n-validators.svg?branch=master)](https://travis-ci.org/AlexanderMac/n-validators)
[![npm version](https://badge.fury.io/js/n-validators.svg)](https://badge.fury.io/js/n-validators)

### Commands

```sh
# Install
$ npm i -S n-validators
```

### Usage
```js
const validators = require('validators');

let r1 = validators.isId(11); // r1 - true
let r2 = validators.isId('invalid id'); // r2 - false
```

### API

- **isDateString(val)**<br>
Returns `true` if `val` is a valid date string.

- **isNotEmptyString(val)**<br>
Returns `true` if `val` is not an empty string.

- **isId(val)**<br>
Returns `true` if `val` is a valid id (a positive integer number).

- **everyIsId(items)**<br>
Returns `true` if `items` is an array with valid id elements.

- **everyIsUniqueId(items)**<br>
Returns `true` if `items` is an array with valid, unique id elements.

- **isObjectId(val)**<br>
Returns `true` if `val` is a valid ObjectId.

- **everyIsObjectId(items)**<br>
Returns `true` if `items` is an array with valid ObjectId elements.

- **everyIsUniqueObjectId(items)**<br>
Returns `true` if `items` is an array with valid, unique ObjectId elements.

- **everyIsObjectIdOrNull(items)**<br>
Returns `true` if `items` is an array with valid ObjectId or null elements.

- **everyIsUniqueObjectIdOrNull(items)**<br>
Returns `true` if `items` is an array with valid, unique ObjectId or null elements.

- **isEmail(val)**<br>
Returns `true` if `val` is a valid email.

- **isSimplePhoneNumber(val)**<br>
Returns `true` if `val` is a valid phone number (a string with digits started from `+`).

- **everyIsAllowed(items, allowed)**<br> 
Returns `true` if `items` is an array with elements from `allowed`.

- **everyIsUniqueAllowed(items, allowed)**<br>
Returns `true` if `items` is an array of unique elements from `allowed`.

- **isFieldsString(val, allowed)**<br>
Returns `true` if `val` is a string of fields separated by space from `allowed`.

### Author
Alexander Mac

### License
[MIT License](license)