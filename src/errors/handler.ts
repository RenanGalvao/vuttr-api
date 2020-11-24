/*
* This is a middleware that takes all the errors of the application and gathers it here. 
* I am using 'express-async-errors' to make this work since this package allows errors thrown 
* in the application to be passed on through middleware.
*/

import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

import ExtendedObject from '../interfaces/objectThatAcceptsStringIndexes';

const errorHandler:ErrorRequestHandler = (error, request, response, next) => {
    
  // Create an error(s) object based on Yup's validation fails
  if(error instanceof ValidationError){
    let errors: ExtendedObject = {};
    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });
    
    if(Object.keys(errors).length == 0){
      errors = {
        [error.path]: [error.message]
      };
    }

    return response.status(400).json({message: 'Validation fails', errors});
    
  }else if(error.message == 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'){

    return response.status(400).json({message: error.message, error: error.name});

  }

  console.error(error);
  return response.status(500).json({message: 'Internal server error'});
};

export default errorHandler;