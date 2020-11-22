import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import mongoose from 'mongoose';

import './database/connection';
import errorHandler from './errors/handler';
import * as routes from './routes/index';
import config from './configs/main';

const app = express();

// Basic security
app.use(helmet());

// CORS
app.use(function(req: Request, res: Response, next: NextFunction): any{
	const allowedOrigins: Array<string | undefined> = config.allowedOrigins;
    const origin: string | undefined = req.headers.origin;
    if(origin && allowedOrigins.indexOf(origin) > -1){
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

	next();
});

// Parse incoming data to JSON
app.use(express.json());

// Routes
app.use(routes.tools);
app.use(routes.authentication);

// The next two routes are only available in dev/test enviroment for security reasons
if(config.envName == 'development' || config.envName == 'test'){
  app.use(routes.dropDatabase);

  // Only available if there is no user in the database, otherwise sends 403
  app.use(routes.firstTime);
}

// Error handling as middleware (catches all errors in app)
app.use(errorHandler);

// Starts server
app.listen(config.serverPort, () => {
  console.log(`Listening on ${config.serverPort} port`);
});

// Export app for testing
export default app;