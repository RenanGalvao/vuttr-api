import Config from '../interfaces/configInterface';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({path: path.join(path.resolve('configs'), '..', '.env')});

// Container for all the environments
let environments = Object();

// Development (default)
environments.development = {
  envName: 'development',
  serverPort: 3000,
  mongoURL: 'mongodb://localhost:27017/vuttr-dev',
  allowedOrigins: ['http://localhost'],
} as Config;

// Production
environments.production = {
  envName: 'production',
  serverPort: 3000,
  mongoURL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/vuttr`,
  allowedOrigins: ['https://yourdomain'],
} as Config;

// Test
environments.test = {
  envName: 'test',
  serverPort: 3000,
  mongoURL: 'mongodb://localhost:27017/vuttr-test',
  allowedOrigins: ['http://localhost'],
} as Config;

// Determine wich environment was passed as a command-line argument if any
const currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not, default to development
const environmentToExport: Config = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment]: environments.development;

export default environmentToExport;