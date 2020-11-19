import { Document } from 'mongoose';

// All fields are optional as users could request non-existent data 
// which would result in a code break in views
export default interface Tool extends Document {
  name?: string;
  email?: string;
  password?: string;
};