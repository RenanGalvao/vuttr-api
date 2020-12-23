/*
* This file defines what information will be returned to the user. 
* If you want something not to go to the user, just omit the object's key and value.
*/
import User from '../interfaces/usersInterface';
import { Response } from 'express';
import ExtendedRequest from '../interfaces/extendedRequestInterface';
import { isAuthorized } from '../lib/helpers';

export default function UserView(data: User | User[] | null, req: ExtendedRequest, res: Response) {
  // If empty
  if(data == null || data instanceof Array && data.length == 0){
    return res.status(404).json(errorNotFound);
  }
  else if(data instanceof Array){
    return res.json(renderMany(data, req));
  }
  else{
    return res.json(render(data, req));
  }
  
};

const errorNotFound = {
  err: 'Error',
  message: 'User(s) not found.',
};

function renderMany(users: User[], req: ExtendedRequest){
  return users.map(user => render(user, req));
}

function render(user: User | null, req: ExtendedRequest){
  let viewObj = {
    id: user?._id,
    name: user?.name,
    email: user?.email,
  } as User;

  if(isAuthorized(req)){
    viewObj = {
      ...viewObj,
      created_at: user?.created_at,
      updated_at: user?.updated_at,
    } as User;
  }

  return viewObj;
}