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
const userModel_1 = __importDefault(require("../models/userModel"));
const usersView_1 = __importDefault(require("../views/usersView"));
const helpers_1 = require("../lib/helpers");
const util_1 = require("util");
// Setting debug name for the file
const debug = util_1.debuglog('users');
exports.default = {
    // [GET] Returns all route data according to the filter
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(util_1.formatWithOptions({ colors: true }, '[USERS][GET] Request Body: %O\nResponse Locals:', req.body, res.locals));
            // Get filters if any
            const { skip, limit, order, field, queryConditions } = helpers_1.createFilter(req.query);
            const users = yield userModel_1.default.find(queryConditions).limit(limit).skip(skip).sort({ [field]: order });
            ;
            res.setHeader('X-Total-Count', users.length);
            return usersView_1.default(users, req, res);
        });
    },
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(util_1.formatWithOptions({ colors: true }, '[USERS][GET] Request Body: %O\nResponse Locals:', req.body, res.locals));
            // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
            if (mongoose_1.default.Types.ObjectId.isValid(new mongoose_1.default.Types.ObjectId(req.params.id))) {
                const user = yield userModel_1.default.findOne({ _id: req.params.id });
                return usersView_1.default(user, req, res);
            }
        });
    },
    // [POST]
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(util_1.formatWithOptions({ colors: true }, '[USERS][POST] Request Body: %O\nResponse Locals:', req.body, res.locals));
            // Recover data in User format
            const data = Object.assign({}, req.body);
            // Checks whether the data sent is valid
            const schema = Yup.object().shape({
                name: Yup.string().required(),
                email: Yup.string().email().required(),
                password: Yup.string().required(),
            });
            yield schema.validate(data, { abortEarly: false });
            const user = yield userModel_1.default.create(data);
            return usersView_1.default(user, req, res);
        });
    },
    // [PUT]
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(util_1.formatWithOptions({ colors: true }, '[USERS][PUT] Request Body: %O\nResponse Locals:', req.body, res.locals));
            if (mongoose_1.default.Types.ObjectId.isValid(new mongoose_1.default.Types.ObjectId(req.params.id))) {
                const data = Object.assign({}, req.body);
                const schema = Yup.object().shape({
                    name: Yup.string().optional().min(1),
                    email: Yup.string().email().optional().min(1),
                    password: Yup.string().optional().min(1),
                });
                yield schema.validate(data, { abortEarly: false });
                const jwt = Object.assign({}, res.locals.jwt);
                const user = yield userModel_1.default.findOneAndUpdate({ _id: jwt.userId }, { $set: data });
                return usersView_1.default(user, req, res);
            }
        });
    },
    // [DELETE]
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(util_1.formatWithOptions({ colors: true }, '[USERS][DELETE] Request Body: %O\nResponse Locals:', req.body, res.locals));
            if (mongoose_1.default.Types.ObjectId.isValid(new mongoose_1.default.Types.ObjectId(req.params.id))) {
                const jwt = Object.assign({}, res.locals.jwt);
                yield userModel_1.default.deleteOne({ _id: jwt.userId });
                return res.status(204).end();
            }
        });
    }
};
