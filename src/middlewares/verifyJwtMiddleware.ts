import {Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const errorMessage = 'No authorization token sent.';

  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];

    if(token){
      const publicKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'public.pen'));
      jwt.verify(token, publicKey, (err, decoded) => {
        if(decoded){
          res.locals.jwt = decoded;
          return next();
        }else{
          return res.status(403).json({ Error: errorMessage });
        }
      });
    }else{
      return res.status(403).json({ Error: errorMessage });
    }
  }else{
    return res.status(403).json({ Error: errorMessage });
  }
};