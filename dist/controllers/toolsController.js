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
const toolsSchema_1 = __importDefault(require("../schemas/toolsSchema"));
const toolsView_1 = __importDefault(require("../views/toolsView"));
const errorNotFound = {
    error: 'Error',
    message: 'Tool(s) not found.'
};
exports.default = {
    // Returns all route data or according to the filter
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Filters the search result using keys and values ​​sent by the query string
            let queryObj = {};
            for (let i = 0; i < Object.keys(req.query).length; i++) {
                // Create key and value pairs that will be used next, using regex for a more loose search
                queryObj[Object.keys(req.query)[i]] = { $regex: `${Object.values(req.query)[i]}`, $options: 'i' };
            }
            const toolsCollection = mongoose_1.default.model('tools', toolsSchema_1.default);
            const tools = yield toolsCollection.find(queryObj);
            // If the database is empty
            if (tools.length == 0) {
                return res.status(404).json(errorNotFound);
            }
            return res.json(toolsView_1.default.renderMany(tools));
        });
    },
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
            if (mongoose_1.default.Types.ObjectId.isValid(new mongoose_1.default.Types.ObjectId(req.params.id))) {
                const toolsCollection = mongoose_1.default.model('tools', toolsSchema_1.default);
                const tool = yield toolsCollection.findOne({ _id: req.params.id });
                // If its not found
                if (tool == null) {
                    return res.status(404).json(errorNotFound);
                }
                return res.json(toolsView_1.default.render(tool));
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
            const toolsCollection = mongoose_1.default.model('tools', toolsSchema_1.default);
            const tool = yield toolsCollection.create(data);
            return res.status(201).json(toolsView_1.default.render(tool));
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
                const toolsCollection = mongoose_1.default.model('tools', toolsSchema_1.default);
                const tool = yield toolsCollection.findOneAndUpdate({ _id: req.params.id }, { $set: data });
                if (tool == null) {
                    return res.status(404).json(errorNotFound);
                }
                return res.status(200).json(toolsView_1.default.render(tool));
            }
        });
    },
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.default.Types.ObjectId.isValid(new mongoose_1.default.Types.ObjectId(req.params.id))) {
                const toolsCollection = mongoose_1.default.model('tools', toolsSchema_1.default);
                const tool = yield toolsCollection.deleteOne({ _id: req.params.id });
                if (tool.deletedCount == 0) {
                    return res.status(404).json(errorNotFound);
                }
                return res.status(204).json();
            }
        });
    }
};
