import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { ValidationError } from 'yup';

import ExtendedObject from '../interfaces/objectThatAcceptsStringIndexes';

const errorHandler:ErrorRequestHandler = (error, request, response) => {
    
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
    
  }else if(error instanceof mongoose.Error){

    return response.status(400).json({message: error.message, error: error.name});
  
  }else if(error instanceof SyntaxError){

    return response.status(400).json({message: error.message, error: error.name});

  }else if(error.message == 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters'){

    return response.status(400).json({message: error.message, error: error.name});

  }

  console.error(error);
  return response.status(500).json({message: 'Internal server error'});
};

export default errorHandler;