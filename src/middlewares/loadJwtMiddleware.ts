/*
/*
* This middleware loads JsonWebToken if it was sent.
* Use this middleware on every route that requires authentication.
*/
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { debuglog, formatWithOptions } from 'util';

// Setting debug name for the file
const debug = debuglog('load-jwt');

export default (req: Request, res: Response, next: NextFunction) => {
  debug(formatWithOptions({colors: true}, '[LOAD_JWT][INPUT] Request Body: %O\nResponse Locals: %O', req.body, res.locals));

  // Uses Bearer authentication scheme
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];

    if(token){
      const publicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'public.pen'));
      jwt.verify(token, publicKey, (err, decoded) => {
        if(decoded){
          // If decoded token information is needed on the next controller
          res.locals.jwt = decoded;

          debug(formatWithOptions({colors: true}, '[LOAD_JWT][OUTPUT] Response Locals: %O', res.locals));
          return next();
        }else{
          return next();
        }
      });
    }else{
      return next();
    }
  }else{
    return next();
  }
};