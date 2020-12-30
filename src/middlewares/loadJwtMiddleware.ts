/*
* This middleware loads and refresh JWT token to res.locals.jwt if was sent over cookie.
*/
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { debuglog, formatWithOptions } from 'util';
import { accessPublicKey, refreshPublicKey } from '../configs/token';
import { generateAuthCookies } from '../lib/helpers';
import JWT from '../interfaces/jwtInterface';

// Setting debug name for the file
const debug = debuglog('load-jwt');

export default (req: Request, res: Response, next: NextFunction) => {
  debug(formatWithOptions({colors: true}, '[LOAD_JWT][INPUT] Request Body: %O\nRequest Cookies: %O', req.body, req.cookies));
  
  // Load cookies
  const accessToken = req.cookies?.access_token ? req.cookies.access_token : false;
  const refreshToken = req.cookies?.refresh_token ? req.cookies.refresh_token : false;

  // Access Token
  if(accessToken){

    // Verify access token
    try{
      const decoded = jwt.verify(accessToken, accessPublicKey);
      res.locals.jwt = decoded;
      debug(formatWithOptions({colors: true}, '[LOAD_JWT][OUTPUT] Response Locals: %O', res.locals));
      return next();
    
    }catch(err){
      debug(formatWithOptions({colors: true}, '[LOAD_JWT][OUTPUT] Error: %O', err));
    }
  }

  // Refresh Token
  else if(refreshToken){
    // Verify refresh token - Only gets here if acess_token is expired
    try{
      
      const decoded = jwt.verify(refreshToken, refreshPublicKey) as JWT;
      res.locals.jwt = decoded;
      // Being valid, generate new tokens
      const payload = {
        userId: decoded.userId,
        userEmail: decoded.userEmail,
        userName: decoded.userName, 
      } as JWT;
      generateAuthCookies(res, payload);
      debug(formatWithOptions({colors: true}, '[LOAD_JWT][OUTPUT] Response Locals: %O', res.locals));
      return next();

    }catch(err){
      debug(formatWithOptions({colors: true}, '[LOAD_JWT][OUTPUT] Error: %O', err));
      return next();
    }
  }

  // None
  else{
    return next();
  }
};