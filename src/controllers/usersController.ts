import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Yup from 'yup';
import userCollection from '../models/userModel';
import userView from '../views/usersView'
import User from '../interfaces/usersInterface';
import JWT from '../interfaces/jwtInterface';
import { createFilter } from '../lib/helpers'
import { debuglog, formatWithOptions } from 'util';

// Setting debug name for the file
const debug = debuglog('users');

export default {

  // [GET] Returns all route data according to the filter
  async index(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[USERS][GET] Request Body: %O\nResponse Locals:', req.body, res.locals));

    // Get filters if any
    const { skip, limit, order, field, queryConditions } = createFilter(req.query);
    const users = await userCollection.find(queryConditions).limit(limit).skip(skip).sort({[field]: order});;

    res.setHeader('X-Total-Count', users.length);
    return userView(users, req, res);
  },

  async show(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[USERS][GET] Request Body: %O\nResponse Locals:', req.body, res.locals));

    // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      
      const user = await userCollection.findOne({ _id: req.params.id });
      return userView(user, req, res);
    }
  },

  // [POST]
  async create(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[USERS][POST] Request Body: %O\nResponse Locals:', req.body, res.locals));

    // Recover data in User format
    const data = {
      ...req.body
    } as User;
    
    // Checks whether the data sent is valid
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }); 
    await schema.validate(data, { abortEarly: false });

    const user = await userCollection.create(data);
    return userView(user, req, res);
  },

  // [PUT]
  async update(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[USERS][PUT] Request Body: %O\nResponse Locals:', req.body, res.locals));
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      
      const data = {
        ...req.body
      } as User;

      const schema = Yup.object().shape({
        name: Yup.string().optional().min(1),
        email: Yup.string().email().optional().min(1),
        password: Yup.string().optional().min(1),
      }); 
      await schema.validate(data, {abortEarly: false});

      const jwt = {
        ...res.locals.jwt
      } as JWT;

      const user = await userCollection.findOneAndUpdate({ _id: jwt.userId}, {$set: data});
      return userView(user, req, res);
    }
  },

  // [DELETE]
  async remove(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[USERS][DELETE] Request Body: %O\nResponse Locals:', req.body, res.locals));
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      
      const jwt = {
        ...res.locals.jwt
      } as JWT;

      await userCollection.deleteOne({ _id: jwt.userId });
      return res.status(204).end();
    }
  }
}