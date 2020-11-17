import { Schema } from 'mongoose';

export default new Schema({
  title: {type: String, trim: true, required: true },
  link: {type: String, trim: true, required: true },
  description: {type: String, trim: true, required: true},
  tags: {type: Array, required: true},
},
{ 
  collection: 'tools',
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});