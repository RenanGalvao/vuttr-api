"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadJwtMiddleware_1 = __importDefault(require("./loadJwtMiddleware"));
const helpers_1 = require("../lib/helpers");
exports.default = (req, res, next) => {
    // Load token if any
    loadJwtMiddleware_1.default(req, res, () => { });
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
