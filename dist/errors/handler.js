"use strict";
/*
* This is a middleware that takes all the errors of the application and gathers it here.
* I am using 'express-async-errors' to make this work since this package allows errors thrown
* in the application to be passed on through middleware.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const yup_1 = require("yup");
const errorHandler = (error, request, response, next) => {
    // Create an error(s) object based on Yup's validation fails
    if (error instanceof yup_1.ValidationError) {
        let errors = {};
        error.inner.forEach(err => {
            errors[err.path] = err.errors;
        });
        if (Object.keys(errors).length == 0) {
            errors = {
                [error.path]: [error.message]
            };
        }
        return response.status(400).json({ message: 'Validation fails', errors });
    }
    else if (error.message == 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters') {
        return response.status(400).json({ message: error.message, error: error.name });
    }
    console.error(error);
    return response.status(500).json({ message: 'Internal server error' });
};
exports.default = errorHandler;
