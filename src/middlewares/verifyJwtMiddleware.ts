/*
* This middleware checks whether the user is authorized. 
* Otherwise, it denies access.
*/
import { Request, Response, NextFunction } from 'express';
import loadJwtMiddleware from './loadJwtMiddleware';
import { isAuthorized } from '../lib/helpers';

export default (req: Request, res: Response, next: NextFunction) => {
 
  // Load token if any
  loadJwtMiddleware(req, res, () => {});

  // Auth
  if(isAuthorized(res)){
    return next();
  }else{
    return res.status(401).json(errorNotAuthorized);
  }
};

const errorNotAuthorized = {
  error: 'Authorization',
  message: 'Token was not sent or is expired.'
};