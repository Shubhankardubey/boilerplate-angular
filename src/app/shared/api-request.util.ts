import {HttpErrorResponse} from '@angular/common/http';

export class APIRequestUtility {
  static parseError(httpError: HttpErrorResponse, validationErrorSource?: object): string {
    // load from httpError
    const {error, status} = httpError;
    // check if it can be parsed
    if (status) {
      // process it
      // obtain errors from response
      const {errors} = error;
      // main error text to render
      let errMessage = null;
      // iterate over errors if any
      // errors are treated as validation errors
      if (errors) {
        errors.every((validationError) => {
          // deconstruct validation error
          const {param, msg} = validationError;
          if (!validationErrorSource) {
            // if no validation error source was provided
            // load the first one
            errMessage = msg;
            // and break the cycle
            return false;
          }
          // safe to load validation error
          validationErrorSource[param] = msg;
          // continue cycle
          return true;
        });
      } else {
        // not a validation error - load main error
        errMessage = error.error;
      }
      return errMessage;
    } else {
      // TODO: Add a way to handle unexpected errors
      console.log(httpError);
    }
  }
}
