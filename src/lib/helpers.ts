// The middlewares uses it to verify authorization.
// It differs from the middleware version, it only says whether the user is authorized or not, it does not send an error message
import { Request, Response, CookieOptions } from 'express';
import { debuglog, formatWithOptions } from 'util';
import jwt from 'jsonwebtoken';
import { accessPrivateKey, accessOptions, refreshPrivateKey, refreshOptions } from '../configs/token';
import { accessCookieOptions, refreshCookieOptions } from '../configs/cookie';

// Setting debug name for the file
const debug = debuglog('helpers');

export function isAuthorized (res: Response) {
  debug(formatWithOptions({colors: true}, '[IS_AUTHORIZED][INPUT] Response Locals: %O', res.locals));

  if(res.locals && typeof res.locals.jwt === 'object' && Object.keys(res.locals.jwt).length >= 1){
    debug(formatWithOptions({colors: true}, '[IS_AUTHORIZED][OUTPUT] Boolean: %O', true));
    return true;
  }else{
    debug(formatWithOptions({colors: true}, '[IS_AUTHORIZED][OUTPUT] Boolean: %O', false));
    return false;
  }
}

// Creates a filter object from request.query
// _start = skip, _end = limit, ,_sort = field, _order = asc/desc 
export function createFilter(query: Request['query']){
  debug(formatWithOptions({colors: true}, '[CREATE_FILTER][INPUT] Request Query: %O', query));

  // Default values to avoid crashing the query
  let {
    _start: skip = 0,
    _end: limit = 20, // 20 items per page
    _order: order = 'asc',
    _sort: field = '_id',
    ...others
  } = query;

  // For a value in a specific field, works like the LIKE operator from SQL
  // Allows a loose search
  let queryConditions = Object();
  for(let i = 0; i < Object.keys(others).length; i++){
    queryConditions[Object.keys(others)[i]] = { 
      $search: `${Object.values(others)[i]}`
    };
  }

  let filter = { 
    skip: Number(skip), 
    limit: Number(limit), 
    order: String(order), 
    field: String(field), 
    queryConditions 
  }

  debug(formatWithOptions({colors: true}, '[CREATE_FILTER][OUTPUT] Object: %O', filter));
  return filter;
}

// Generates acess and refresh token, and set cookies
export function generateAuthCookies(res: Response, payload: Object) {
  // Set Tokens
  const accessToken =  jwt.sign(payload, accessPrivateKey, accessOptions as jwt.SignOptions);
  const refreshToken = jwt.sign(payload, refreshPrivateKey, refreshOptions as jwt.SignOptions);
  
  // Set Cookies
  res.cookie('access_token', accessToken, accessCookieOptions as CookieOptions);
  res.cookie('refresh_token', refreshToken, refreshCookieOptions as CookieOptions);
}

export default { isAuthorized, createFilter, generateAuthCookies };