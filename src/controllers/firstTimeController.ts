import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Yup from 'yup';
import bcrypt from 'bcrypt';
import UserSchema from '../schemas/usersSchema';
import User from '../interfaces/usersInterface';
import UserView from '../views/usersView';

export default {

  async create(req: Request, res: Response){

    const usersCollection = mongoose.model<User>('users', UserSchema);
    const users = await usersCollection.find({});
    if(users.length != 0){
      return res.status(403).json();
    }

    const data = {
      ...req.body
    } as User;
    
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