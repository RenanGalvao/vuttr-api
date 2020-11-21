/*
* This is a middleware that checks if the user has sent the JWT token and if it is valid. 
* Being valid, the request continues, being invalid, 403 or 401 is returned as HTTP status.
* 
* Use this middleware on every route that requires authentication.
*/
import {Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const errorMessage = 'No authorization token sent.';

  // Uses Bearer authentication scheme
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];

    if(token){
      const publicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'public.pen'));
      jwt.verify(token, publicKey, (err, decoded) => {
        if(decoded){
          // If decrypted token information is needed on the next controller
          res.locals.jwt = decoded;
          return next();
        }else{
          return res.status(401).json({ Error: errorMessage });
        }
      });
    }else{
      return res.status(403).json({ Error: errorMessage });
    }
  }else{
    return res.status(403).json({ Error: errorMessage });
  }
};