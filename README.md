# simple-custom-errors

This repository includes 2 custom error set-up that both:

- Use a map as a keyed list of error messages, template functions
- Allow customizing the error name by renaming the class name accordingly (ex: MyApiError)
- Automatically sets an error.code property
- Make it possible to throw exceptions consistently throughout an api

<br>

**Usage**

*1. Generate custom constructors*

Run one of either scripts after choosing an error name (ex: MyApiError). The corresponding file will be created at root directory. You can then copy it to your own project.

```bash
# create a MyApiError.js file:
npm run create MyApiError

# create a customErrors.js with { Error, TypeError, RangeError } file:
npm run create-set MyApiError
```

*2. Optionally list exceptions in a map structure*

```javascript
const TEMPLATES = new Map([
  [
    'ERROR_MESSAGE',
    'Message content'
  ],
  [
    'ERROR_TEMPLATE',
    (arg1, arg2) => `Message with ${arg1} and ${arg2}.`
  ]
]);
```

*3. Ready to throw*

**SimpleError**

This constructor extends standard Error. It takes both an arbitrary message or a map key as 1st argument. When a map key is used, an error code property is set accordingly.

```javascript
// examples

import MyApiError from "./errors/MyApiError.js";

throw new MyApiError('Some error message');
throw new MyApiError('ERROR_MESSAGE');
throw new MyApiError('ERROR_TEMPLATE', 'data1', 'data2');
```
```console
MyApiError [ERROR_TEMPLATE]: Message with data1 and data2.
    at file:///home/smrv95code/nodejs-utils/simple-custom-errors/index.js:12:7
(...) {
  code: 'ERROR_TEMPLATE'
}
```

**customErrors**

This object exposes 3 constructors. These extend standard Error, TypeError and RangeError. They take both an arbitrary message or a map key as 1st argument. When a map key is used, an error code property is set accordingly.

```javascript
// examples

import customErrors from "./errors/customErrors.js";
const { Error, TypeError, RangeError } = customErrors;

throw new Error('Some error message');
throw new Error('ERROR_MESSAGE');
throw new Error('ERROR_TEMPLATE', 'data1', 'data2');
throw new TypeError('unexpected type');
throw new RangeError('out of range');
```
```console
MyApiError [ERROR_TEMPLATE]: Message with data1 and data2.
    at file:///home/smrv95code/nodejs-utils/simple-custom-errors/index.js:12:7
(...) {
  code: 'ERROR_TEMPLATE'
}
```
