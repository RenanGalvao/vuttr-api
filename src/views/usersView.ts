/*
* This file defines what information will be returned to the user. 
* If you want something not to go to the user, just omit the object's key and value.
*/
import User from '../interfaces/usersInterface';
import { Request, Response } from 'express';
import { isAuthorized } from '../lib/helpers';
import { debuglog, formatWithOptions } from 'util';

// Setting debug name for the file
const debug = debuglog('users-view');

export default function UserView(data: User | User[] | null, req: Request, res: Response) {
  debug(formatWithOptions({colors: true}, '[USER_VIEW][INPUT] Data: %O\nRequest Method: %O\nResponse Locals: %O', data, req.method, res.locals));

  // Does the user has a valid jwt?
  let isUserAuthorized = isAuthorized(res);
  
  // If empty
  if(data == null || data instanceof Array && data.length == 0){
    debug(formatWithOptions({colors: true}, '[USER_VIEW][OUTPUT] Status: %O \n JSON: %O', 404, errorNotFound));
    return res.status(404).json(errorNotFound);
  }
  // Array
  else if(data instanceof Array){
    const jsonResponse = renderMany(data, isUserAuthorized);
    debug(formatWithOptions({colors: true}, '[USER_VIEW][OUTPUT] Status: %O \n JSON: %O', 200, jsonResponse));
    return res.json(jsonResponse);
  }
  // One
  else{
    const status = req.method == 'POST' ? 201 : req.method == 'DELETE' ? 204 : 200;
    const jsonResponse = render(data, isUserAuthorized);
    debug(formatWithOptions({colors: true}, '[USER_VIEW][OUTPUT] Status: %O \n JSON: %O', status, jsonResponse));
    return res.status(status).json(jsonResponse);
  }
  
};

const errorNotFound = {
  error: 'Error',
  message: 'User(s) not found.',
};

function renderMany(users: User[], isAuthorized: boolean){
  return users.map(user => render(user, isAuthorized));
}

function render(user: User | null, isAuthorized: boolean){
  let viewObj = {
    id: user?._id,
    name: user?.name,
    email: user?.email,
  } as User;

  if(isAuthorized){
    viewObj = {
      ...viewObj,
      created_at: user?.created_at,
      updated_at: user?.updated_at,
    } as User;
  }

  return viewObj;
}