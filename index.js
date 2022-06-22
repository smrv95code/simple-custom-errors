
'use strict';


import SimpleError from "./lib/SimpleError.js";
import customErrors from "./lib/customErrors.js";

const { Error, TypeError, RangeError } = customErrors;


// Examples:

//throw new SimpleError('Some error message');
//throw new SimpleError('ERROR_MESSAGE');
//throw new SimpleError('ERROR_TEMPLATE', 'data1', 'data2');

//throw new Error('ERROR_MESSAGE');
//throw new Error('ERROR_TEMPLATE', 'data1', 'data2');
//throw new Error('Some error message');

//throw new TypeError('unexpected type');
//throw new RangeError('out of range');
