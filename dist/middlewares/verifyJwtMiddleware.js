"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const errorNotAuthorized = {
        error: 'Authorization',
        message: 'No authorization token sent.'
    };
    // Uses Bearer authentication scheme
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const publicKey = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'keys', 'public.pen'));
            jsonwebtoken_1.default.verify(token, publicKey, (err, decoded) => {
                if (decoded) {
                    // If decrypted token information is needed on the next controller
                    res.locals.jwt = decoded;
                    return next();
                }
                else {
                    return res.status(401).json(errorNotAuthorized);
                }
            });
        }
        else {
            return res.status(401).json(errorNotAuthorized);
        }
    }
    else {
        return res.status(401).json(errorNotAuthorized);
    }
};
