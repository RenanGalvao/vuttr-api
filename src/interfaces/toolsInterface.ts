import { Document } from 'mongoose';

// All fields are optional as users could request non-existent data 
// which would result in a code break in views
export default interface Tool extends Document {
  title?: string;
  link?: string;
  description?: string;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
};