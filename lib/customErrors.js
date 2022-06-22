/**
 * @description   a full custom error set-up
 */

'use strict';


/**
 * @map a collection of error message templates
 */

const ERRORS = new Map([
  [
    'ERROR_MESSAGE',
    'Message content'
  ],
  [
    'ERROR_TEMPLATE',
    (arg1, arg2) => `Message with ${arg1} and ${arg2}.`
  ]
]);


/**
 * @mixin   errorMixin
 * @extends Error,TypeError,RangeError
 */

function errorMixin(Base) {
  return class SimpleError extends Error {
    constructor(key, ...args) {

    /**
     * @param {string} key a <map> ERROR key or a message argument
     * @param {string} args optional <function> template argments or <string> messages
     */

      const template = ERRORS.get(key);

      let message;

      switch (typeof template) {
        case 'function':
          message = template(...args);
          break;
        case 'string':
          message = template;
          break;
        default:
          message = key;
          break;
      };

      super(message);

      if (template) {
        this.code = key;
      };

      Error.captureStackTrace(this, 'SimpleError');
    };

    get name() {
      return this.code ? `SimpleError [${this.code}]` : 'SimpleError';
    };
  };
};


/**
 * @export
 */

const customErrors = {
  Error: errorMixin(Error),
  TypeError: errorMixin(TypeError),
  RangeError: errorMixin(RangeError),
};


export default customErrors;
