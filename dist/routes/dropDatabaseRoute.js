"use strict";
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
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const routes = express_1.Router();
routes.delete('/drop-database/:assertive', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.assertive == 'yes') {
        mongoose_1.default.connection.db.dropDatabase();
        const collectionsIndatabase = yield mongoose_1.default.connection.db.listCollections().toArray();
        if (collectionsIndatabase.length == 0) {
            return res.status(204).json();
        }
        else {
            return res.status(500).json();
        }
    }
    else {
        return res.status(400).json();
    }
}));
exports.default = routes;
