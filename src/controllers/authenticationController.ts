import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Yup from 'yup';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserSchema from '../schemas/usersSchema';
import User from '../interfaces/usersInterface';

export default {
  async verify(req: Request, res: Response){

    // Recover data in User format
    const data = {
      ...req.body
    } as User;

    // Checks whether the data sent is valid
    const schema = Yup.object().shape({
      email: Yup.string().email().required().trim(),
      password: Yup.string().required().trim()
    }); 
    await schema.validate(data, {abortEarly: false});

    const usersCollection = mongoose.model<User>('users', UserSchema);
    const user = await usersCollection.findOne({ email: data.email});

    if(!user) {

      return res.status(404).json({ auth: false });

    }else{

      // Test for the password because the user interface says the password is optional
      // In the Mongo scheme it is not, it is in this way to use the same interface in PUT
      if(user.password !== undefined){

        const auth = await bcrypt.compare(data.password, user.password);
  
        if(auth){

          // Configure the JWT token to be sent to the user
          const payload = { userId: user._id };
          const privateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'private.pen'));
          const options = { algorithm: 'RS256', expiresIn: '1h'} as jwt.SignOptions;

          jwt.sign(payload, privateKey, options, (err, token) => {
            if(!err && token){
              return res.status(200).json({ auth: true, token });
            }
          });

        }else{

          // Wrong password
          return res.status(400).json({ auth: false });

        }
      }
    }
  },
}