"use strict";
/*
* Main config file
* migrate-mongo doesn't work with TS
*/
const path = require('path');
require('dotenv').config({ path: path.join(path.resolve('configs'), '..', '.env') });
const util = require('util');
// Setting debug name for the file
const debug = util.debuglog('config');
// Container for all the environments
let environments = Object();
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
    mongoURL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/vuttr`,
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
debug(util.formatWithOptions({ colors: true }, '[CONFIG] Enviroment Object: %O', environmentToExport));
module.exports = environmentToExport;
