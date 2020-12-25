/*
* This is a middleware that takes all the errors of the application and gathers it here. 
* I am using 'express-async-errors' to make this work since this package allows errors thrown 
* in the application to be passed on through middleware.
*/

import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';
import { debuglog, formatWithOptions } from 'util';

// Setting debug name for the file
const debug = debuglog('errors');

const errorHandler:ErrorRequestHandler = (error, req, res, next) => {
  debug(formatWithOptions({colors: true}, '[ERRORS] Error: %O\nRequest Body: %O\nResponse Locals:', error, req.body, res.locals));
    
  // Create an error(s) object based on Yup's validation fails
  if(error instanceof ValidationError){
    let errors = Object();
    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });
    
    if(Object.keys(errors).length == 0){
      errors = {
        [error.path]: [error.message]
      };
    }

    return res.status(400).json({message: 'Validation fails', errors});
    
  }else if(error.message == 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'){

    return res.status(400).json({message: error.message, error: error.name});

  }

  return res.status(500).json({message: 'Internal server error'});
};

export default errorHandler;