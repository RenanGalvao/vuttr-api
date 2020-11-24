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
const mongoose_1 = __importDefault(require("mongoose"));
const main_1 = __importDefault(require("../configs/main"));
const database_1 = __importDefault(require("../configs/database"));
const buildNecessaryDatabase_1 = __importDefault(require("./buildNecessaryDatabase"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(`${main_1.default.mongoURL}`, database_1.default);
    mongoose_1.default.set('returnOriginal', false);
    // Drop database for testing enviroment
    if (main_1.default.envName == 'test') {
        mongoose_1.default.connection.db.dropDatabase();
    }
    // Create the database if there's none.
    // Keep in mind that each environment has its own database.
    // test: vuttr-test, dev: vuttr-dev, prod: vuttr.
    const collectionsIndatabase = yield mongoose_1.default.connection.db.listCollections().toArray();
    if (collectionsIndatabase.length == 0) {
        buildNecessaryDatabase_1.default();
    }
}))();
