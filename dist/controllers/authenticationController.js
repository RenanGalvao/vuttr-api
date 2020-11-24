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
const mongoose_1 = __importDefault(require("mongoose"));
const Yup = __importStar(require("yup"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersSchema_1 = __importDefault(require("../schemas/usersSchema"));
exports.default = {
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recover data in User format
            const data = Object.assign({}, req.body);
            // Checks whether the data sent is valid
            const schema = Yup.object().shape({
                email: Yup.string().email().required().trim(),
                password: Yup.string().required().trim()
            });
            yield schema.validate(data, { abortEarly: false });
            const usersCollection = mongoose_1.default.model('users', usersSchema_1.default);
            const user = yield usersCollection.findOne({ email: data.email });
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
                        const payload = { userId: user._id };
                        const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', '..', 'keys', 'private.pen'));
                        const options = { algorithm: 'RS256', expiresIn: '1h' };
                        jsonwebtoken_1.default.sign(payload, privateKey, options, (err, token) => {
                            if (!err && token) {
                                return res.status(200).json({ auth: true, token });
                            }
                        });
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
