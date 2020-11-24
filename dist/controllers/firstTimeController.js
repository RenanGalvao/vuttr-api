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
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersSchema_1 = __importDefault(require("../schemas/usersSchema"));
const usersView_1 = __importDefault(require("../views/usersView"));
exports.default = {
    // Only works if there is no user in the database, after the first one returns the status code 403
    // When the server is restarted, the route is not even available
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Checks that there is no user in the database
            const usersCollection = mongoose_1.default.model('users', usersSchema_1.default);
            const users = yield usersCollection.find({});
            // find() return an array, check for the length
            if (users.length != 0) {
                return res.status(403).json();
            }
            // Recover data in User format
            const data = Object.assign({}, req.body);
            // Checks whether the data sent is valid
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required(),
            });
            yield schema.validate(data, { abortEarly: false });
            const saltRounds = 10;
            data.password = yield bcrypt_1.default.hash(data.password, saltRounds);
            const user = yield usersCollection.create(data);
            return res.status(201).json(usersView_1.default.render(user));
        });
    },
};
