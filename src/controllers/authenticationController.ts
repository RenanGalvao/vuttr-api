import { Request, Response } from 'express';
import * as Yup from 'yup';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userCollection from '../models/userModel';
import User from '../interfaces/usersInterface';
import { debuglog, formatWithOptions } from 'util';
import JWT from '../interfaces/jwtInterface';

// Setting debug name for the file
const debug = debuglog('auth');


export default {

  // [POST]
  async verify(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[AUTH][POST] Request Body: %O\nResponse Locals: %O', req.body, res.locals));

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

    const user = await userCollection.findOne({ email: data.email });

    if(!user) {

      return res.status(404).json({ auth: false });

    }else{
      // Test for the password because the user interface says the password is optional
      // In the Mongo scheme it is not, it is in this way to use the same interface in PUT
      if(user.password !== undefined){

        const auth = await bcrypt.compare(data.password, user.password);
  
        if(auth){

          // Configure the JWT token to be sent to the user
          const payload = { 
            userId: user._id,
            userEmail: user.email,
            userName: user.name, 
          } as JWT;

          const privateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'keys', 'access_private.pen'));
          const access_options = { algorithm: 'RS256', expiresIn: '1h'} as jwt.SignOptions;
          const refresh_options = { algorithm: 'RS256', expiresIn: '2h'} as jwt.SignOptions;

          const access_token =  jwt.sign(payload, privateKey, access_options);
          const refresh_token = jwt.sign(payload, privateKey, refresh_options);
          
          return res.status(201).json({ auth: true, access_token, refresh_token });
        }else{
          // Wrong password
          return res.status(401).json({ auth: false });
        }
      }
    }
  },
}