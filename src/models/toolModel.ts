import { model, Model, Schema } from 'mongoose';
import Tool from '../interfaces/toolsInterface';
// This import is necessary for the connection to be shared through the mongoose object
import '../database/connection'; 

const toolSchema = new Schema({
  title: {type: String, trim: true, required: true },
  link: {type: String, trim: true, required: true },
  description: {type: String, trim: true, required: true},
  tags: {type: Array, required: true},
  userId: {type: Schema.Types.ObjectId, ref: 'users', required: true},
},
{ 
  collection: 'tools',
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

let toolCollection: Model<Tool>;

try{
  toolCollection = model('tools', toolSchema);
}catch{
  toolCollection = model('tools');
}

export default toolCollection;