// The middlewares uses it to verify authorization.
// It differs from the middleware version, it only says whether the user is authorized or not, it does not send an error message
import { Request, Response } from 'express';
import { debuglog, formatWithOptions } from 'util';

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
      $regex: `${Object.values(others)[i]}`,
      $options: 'i', 
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

export default { isAuthorized, createFilter };