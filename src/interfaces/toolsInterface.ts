import { Document } from 'mongoose';

// Users can request non-existent data which would result in a code break in the views
export default interface Tool extends Document {
  title?: string;
  link?: string;
  description?: string;
  tags?: string[];
};