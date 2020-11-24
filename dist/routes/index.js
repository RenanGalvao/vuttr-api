"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropDatabase = exports.firstTime = exports.authentication = exports.tools = void 0;
// So them can be easily used as middleware in app
var toolsRoute_1 = require("./toolsRoute");
Object.defineProperty(exports, "tools", { enumerable: true, get: function () { return __importDefault(toolsRoute_1).default; } });
var authenticationRoute_1 = require("./authenticationRoute");
Object.defineProperty(exports, "authentication", { enumerable: true, get: function () { return __importDefault(authenticationRoute_1).default; } });
var firstTimeRoute_1 = require("./firstTimeRoute");
Object.defineProperty(exports, "firstTime", { enumerable: true, get: function () { return __importDefault(firstTimeRoute_1).default; } });
var dropDatabaseRoute_1 = require("./dropDatabaseRoute");
Object.defineProperty(exports, "dropDatabase", { enumerable: true, get: function () { return __importDefault(dropDatabaseRoute_1).default; } });
