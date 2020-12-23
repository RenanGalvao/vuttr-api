// The middlewares uses it to verify authorization.
// It differs from the middleware version, it only says whether the user is authorized or not, it does not send an error message
import ExtendedRequest from '../interfaces/extendedRequestInterface';
import { Request } from 'express';

export function isAuthorized (req: ExtendedRequest) {
  if(req.locals && typeof req.locals.jwt === 'object' && Object.keys(req.locals.jwt).length >= 1){
    return true;
  }else{
    return false;
  }
}

// Creates a filter object from request.query
// _start = skip, _end = limit, ,_sort = field, _order = asc/desc 
export function createFilter(query: Request['query']){

  // Default values to avoid crashing the query
  let {
    _start: skip = 0,
    _end: limit = 0,
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

  return { 
    skip: Number(skip), 
    limit: Number(skip), 
    order: String(order), 
    field: String(field), 
    queryConditions 
  };
}

export default { isAuthorized, createFilter };