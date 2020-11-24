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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const helmet_1 = __importDefault(require("helmet"));
require("./database/connection");
const handler_1 = __importDefault(require("./errors/handler"));
const routes = __importStar(require("./routes/index"));
const main_1 = __importDefault(require("./configs/main"));
const app = express_1.default();
// Basic security
app.use(helmet_1.default());
// CORS
app.use(function (req, res, next) {
    const allowedOrigins = main_1.default.allowedOrigins;
    const origin = req.headers.origin;
    if (origin && allowedOrigins.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
// Parse incoming data to JSON
app.use(express_1.default.json());
// Routes
app.use(routes.tools);
app.use(routes.authentication);
// The next two routes are only available in development enviroment for security reasons
if (main_1.default.envName == 'development') {
    app.use(routes.dropDatabase);
    // Only available if there is no user in the database, otherwise sends 403
    app.use(routes.firstTime);
}
// Error handling as middleware (catches all errors in app)
app.use(handler_1.default);
// Starts server
app.listen(main_1.default.serverPort, () => {
    console.log(`Listening on ${main_1.default.serverPort} port`);
});
// Export app for testing
exports.default = app;