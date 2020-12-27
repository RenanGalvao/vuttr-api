"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const verifyJwtMiddleware_1 = __importDefault(require("../middlewares/verifyJwtMiddleware"));
const routes = express_1.Router();
routes.get('/users', usersController_1.default.index);
routes.get('/users/:id', usersController_1.default.show);
routes.post('/users', usersController_1.default.create);
routes.put('/users/:id', verifyJwtMiddleware_1.default, usersController_1.default.update);
routes.delete('/users/:id', verifyJwtMiddleware_1.default, usersController_1.default.remove);
// This tells the user that he cannot use these methods without the id parameter.
routes.put('/users', (req, res) => {
    return res.status(405).json();
});
routes.delete('/users', (req, res) => {
    return res.status(405).json();
});
exports.default = routes;
