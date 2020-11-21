import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import UserSchema from '../schemas/usersSchema';
import User from '../interfaces/usersInterface';
import UserView from '../views/usersView';

export default {

  // Only works if there is no user in the database, after the first one returns the status code 403
  // When the server is restarted, the route is not even available
  async create(req: Request, res: Response){

    // Checks that there is no user in the database
    const usersCollection = mongoose.model<User>('users', UserSchema);
    const users = await usersCollection.find({});

    // find() return an array, check for the length
    if(users.length != 0){
      return res.status(403).json();
    }

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

    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    const user = await usersCollection.create(data);

    return res.status(201).json(UserView.render(user));
  },
}