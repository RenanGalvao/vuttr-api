"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const main_1 = __importDefault(require("./configs/main"));
// Avoids problems with supertest
// Starts server
app_1.default.listen(main_1.default.serverPort, () => {
    console.log(`Listening on ${main_1.default.serverPort} port`);
});
