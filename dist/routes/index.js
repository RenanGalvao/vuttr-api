"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.users = exports.tools = void 0;
// So them can be easily used as middleware in app
var toolsRoute_1 = require("./toolsRoute");
Object.defineProperty(exports, "tools", { enumerable: true, get: function () { return __importDefault(toolsRoute_1).default; } });
var usersRoute_1 = require("./usersRoute");
Object.defineProperty(exports, "users", { enumerable: true, get: function () { return __importDefault(usersRoute_1).default; } });
var authenticationRoute_1 = require("./authenticationRoute");
Object.defineProperty(exports, "authentication", { enumerable: true, get: function () { return __importDefault(authenticationRoute_1).default; } });
