import { model, Model, Schema } from 'mongoose';
import User from '../interfaces/usersInterface';
// This import is necessary for the connection to be shared through the mongoose object
import '../database/connection'; 

const userSchema = new Schema({
  name: {type: String, trim: true, required: true },
  email: {type: String, trim: true, required: true },
  password: {type: String, trim: true, required: true},
},
{ 
  collection: 'users',
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

let userCollection: Model<User>;

try{
  userCollection = model('users', userSchema);
}catch{
  userCollection = model('users');
}

export default userCollection;