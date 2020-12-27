"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
const token_1 = require("../configs/token");
const helpers_1 = require("../lib/helpers");
// Setting debug name for the file
const debug = util_1.debuglog('load-jwt');
exports.default = (req, res, next) => {
    var _a, _b;
    debug(util_1.formatWithOptions({ colors: true }, '[LOAD_JWT][INPUT] Request Body: %O\nRequest Cookies: %O', req.body, req.cookies));
    // Load cookies
    const accessToken = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.acess_token) ? req.cookies.acess_token : false;
    const refreshToken = ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.refresh_token) ? req.cookies.refresh_token : false;
    // Access Token
    if (accessToken) {
        // Verify access token
        try {
            const decoded = jsonwebtoken_1.default.verify(accessToken, token_1.accessPublicKey);
            res.locals.jwt = decoded;
            debug(util_1.formatWithOptions({ colors: true }, '[LOAD_JWT][OUTPUT] Response Locals: %O', res.locals));
            return next();
        }
        catch (err) {
            debug(util_1.formatWithOptions({ colors: true }, '[LOAD_JWT][OUTPUT] Error: %O', err));
        }
    }
    // Refresh Token
    else if (refreshToken) {
        // Verify refresh token - Only gets here if acess_token is expired
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, token_1.refreshPublicKey);
            res.locals.jwt = decoded;
            // Being valid, generate new tokens
            const payload = {
                userId: decoded.userId,
                userEmail: decoded.userEmail,
                userName: decoded.userName,
            };
            helpers_1.generateAuthCookies(res, payload);
            debug(util_1.formatWithOptions({ colors: true }, '[LOAD_JWT][OUTPUT] Response Locals: %O', res.locals));
            return next();
        }
        catch (err) {
            debug(util_1.formatWithOptions({ colors: true }, '[LOAD_JWT][OUTPUT] Error: %O', err));
            return next();
        }
    }
    // None
    else {
        return next();
    }
};
