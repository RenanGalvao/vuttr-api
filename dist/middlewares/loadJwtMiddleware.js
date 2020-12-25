"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
// Setting debug name for the file
const debug = util_1.debuglog('load-jwt');
exports.default = (req, res, next) => {
    debug(util_1.formatWithOptions({ colors: true }, '[LOAD_JWT][INPUT] Request Body: %O\nResponse Locals: %O', req.body, res.locals));
    // Uses Bearer authentication scheme
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const publicKey = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'keys', 'public.pen'));
            jsonwebtoken_1.default.verify(token, publicKey, (err, decoded) => {
                if (decoded) {
                    // If decoded token information is needed on the next controller
                    res.locals.jwt = decoded;
                    debug(util_1.formatWithOptions({ colors: true }, '[LOAD_JWT][OUTPUT] Response Locals: %O', res.locals));
                    return next();
                }
                else {
                    return next();
                }
            });
        }
        else {
            return next();
        }
    }
    else {
        return next();
    }
};
