import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import helmet from 'helmet';

import './database/connection';
import errorHandler from './errors/handler';
import * as routes from './routes/index';

const app = express();

// Basic security
app.use(helmet());

// CORS
app.use(function(req: Request, res: Response, next: NextFunction): any{
	const allowedOrigins: Array<string | undefined> = ['http://localhost'];
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

// Error handling as middleware (catches all errors in app)
app.use(errorHandler);

// Starts server
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on ${process.env.SERVER_PORT} port`);
});

// Export app for testing
export default app;