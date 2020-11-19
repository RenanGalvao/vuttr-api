import { Schema } from 'mongoose';

export default new Schema({
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