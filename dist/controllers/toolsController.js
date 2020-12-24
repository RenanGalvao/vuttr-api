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
const toolModel_1 = __importDefault(require("../models/toolModel"));
const toolsView_1 = __importDefault(require("../views/toolsView"));
const helpers_1 = require("../lib/helpers");
exports.default = {
    // Returns all route data or according to the filter
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get filters if any
            const { skip, limit, order, field, queryConditions } = helpers_1.createFilter(req.query);
            const tools = yield toolModel_1.default.find(queryConditions).limit(limit).skip(skip).sort({ [field]: order });
            ;
            res.setHeader('X-Total-Count', tools.length);
            return toolsView_1.default(tools, req, res);
        });
    },
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
            if (mongoose_1.default.Types.ObjectId.isValid(new mongoose_1.default.Types.ObjectId(req.params.id))) {
                const tool = yield toolModel_1.default.findOne({ _id: req.params.id });
                return toolsView_1.default(tool, req, res);
            }
        });
    },
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Recover data in Tool format
            const data = Object.assign({}, req.body);
            // Checks whether the data sent is valid
            const schema = Yup.object().shape({
                title: Yup.string().required(),
                link: Yup.string().required(),
                description: Yup.string().required(),
                tags: Yup.array().of(Yup.string()).required()
            });
            yield schema.validate(data, { abortEarly: false });
            const tool = yield toolModel_1.default.create(data);
            return toolsView_1.default(tool, req, res);
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.default.Types.ObjectId.isValid(new mongoose_1.default.Types.ObjectId(req.params.id))) {
                const data = Object.assign({}, req.body);
                const schema = Yup.object().shape({
                    title: Yup.string().min(1),
                    link: Yup.string().min(1),
                    description: Yup.string().min(1),
                    tags: Yup.array().of(Yup.string()).min(1)
                });
                yield schema.validate(data, { abortEarly: false });
                const tool = yield toolModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $set: data });
                return toolsView_1.default(tool, req, res);
            }
        });
    },
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.default.Types.ObjectId.isValid(new mongoose_1.default.Types.ObjectId(req.params.id))) {
                const tool = yield toolModel_1.default.deleteOne({ _id: req.params.id });
                return res.status(204).end();
            }
        });
    }
};
const errorNotFound = {
    error: 'Error',
    message: 'Tool(s) not found.'
};
