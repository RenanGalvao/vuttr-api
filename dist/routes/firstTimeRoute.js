"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firstTimeController_1 = __importDefault(require("../controllers/firstTimeController"));
const routes = express_1.Router();
routes.post('/first-time', firstTimeController_1.default.create);
exports.default = routes;
