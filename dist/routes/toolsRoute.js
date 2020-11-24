"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const toolsController_1 = __importDefault(require("../controllers/toolsController"));
const verifyJwtMiddleware_1 = __importDefault(require("../middlewares/verifyJwtMiddleware"));
const routes = express_1.Router();
routes.get('/tools', toolsController_1.default.index);
routes.get('/tools/:id', toolsController_1.default.show);
routes.post('/tools', verifyJwtMiddleware_1.default, toolsController_1.default.create);
routes.put('/tools/:id', verifyJwtMiddleware_1.default, toolsController_1.default.update);
routes.delete('/tools/:id', verifyJwtMiddleware_1.default, toolsController_1.default.remove);
// This tells the user that he cannot use these methods without the id parameter.
routes.put('/tools', (req, res) => {
    return res.status(405).json();
});
routes.delete('/tools', (req, res) => {
    return res.status(405).json();
});
exports.default = routes;
