/*
* This middleware checks whether the user is authorized. 
* Otherwise, it denies access.
*/
import { Request, Response } from 'express';
import { isAuthorized }  from '../lib/helpers';

export default (req: Request, res: Response, next: (err?: any) => void ) => {
  // Auth
  if(isAuthorized(res)){
    return next();
  }else{
    return res.status(401).json(errorNotAuthorized);
  }
}

const errorNotAuthorized = {
  error: 'Authorization',
  message: 'Token was not sent or is expired.'
};
