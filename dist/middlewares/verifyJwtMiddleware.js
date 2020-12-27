"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../lib/helpers");
exports.default = (req, res, next) => {
    // Auth
    if (helpers_1.isAuthorized(res)) {
        return next();
    }
    else {
        return res.status(401).json(errorNotAuthorized);
    }
};
const errorNotAuthorized = {
    error: 'Authorization',
    message: 'Token was not sent or is expired.'
};
