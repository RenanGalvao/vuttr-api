"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Yup = __importStar(require("yup"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const util_1 = require("util");
// Setting debug name for the file
const debug = util_1.debuglog('auth');
exports.default = {
    // [POST]
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(util_1.formatWithOptions({ colors: true }, '[AUTH][POST] Request Body: %O\nResponse Locals: %O', req.body, res.locals));
            // Recover data in User format
            const data = Object.assign({}, req.body);
            // Checks whether the data sent is valid
            const schema = Yup.object().shape({
                email: Yup.string().email().required().trim(),
                password: Yup.string().required().trim()
            });
            yield schema.validate(data, { abortEarly: false });
            const user = yield userModel_1.default.findOne({ email: data.email });
            if (!user) {
                return res.status(404).json({ auth: false });
            }
            else {
                // Test for the password because the user interface says the password is optional
                // In the Mongo scheme it is not, it is in this way to use the same interface in PUT
                if (user.password !== undefined) {
                    const auth = yield bcrypt_1.default.compare(data.password, user.password);
                    if (auth) {
                        // Configure the JWT token to be sent to the user
                        const payload = {
                            userId: user._id,
                            userEmail: user.email,
                            userName: user.name,
                        };
                        const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'keys', 'private.pen'));
                        const acess_options = { algorithm: 'RS256', expiresIn: '1h' };
                        const refresh_options = { algorithm: 'RS256', expiresIn: '2h' };
                        const acess_token = jsonwebtoken_1.default.sign(payload, privateKey, acess_options);
                        const refresh_token = jsonwebtoken_1.default.sign(payload, privateKey, refresh_options);
                        return res.status(201).json({ auth: true, acess_token, refresh_token });
                    }
                    else {
                        // Wrong password
                        return res.status(401).json({ auth: false });
                    }
                }
            }
        });
    },
};
