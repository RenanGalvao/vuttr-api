"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Container for all the environments
let environments = {
    development: {},
    production: {},
};
// Development (default)
environments.development = {
    envName: 'development',
    serverPort: 3000,
    mongoURL: 'mongodb://localhost:27017/vuttr-dev',
    allowedOrigins: ['http://localhost'],
};
// Production
environments.production = {
    envName: 'production',
    serverPort: 3000,
    mongoURL: 'mongodb://username:password@host:port/vuttr',
    allowedOrigins: ['https://yourdomain'],
};
// Test
environments.test = {
    envName: 'test',
    serverPort: 3000,
    mongoURL: 'mongodb://localhost:27017/vuttr-test',
    allowedOrigins: ['http://localhost'],
};
// Determine wich environment was passed as a command-line argument if any
const currentEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
// Check that the current environment is one of the environments above, if not, default to development
const environmentToExport = typeof (environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.development;
exports.default = environmentToExport;
