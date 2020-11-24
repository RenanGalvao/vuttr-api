import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Yup from 'yup';
import ToolsSchema from '../schemas/toolsSchema';
import ToolView from '../views/toolsView';
import Tool from '../interfaces/toolsInterface';
import ExtendedObject from '../interfaces/objectThatAcceptsStringIndexes';

const errorNotFound = {
  error: 'Error',
  message: 'Tool(s) not found.'
}


export default {

  // Returns all route data or according to the filter
  async index(req: Request, res: Response){
    // Filters the search result using keys and values ​​sent by the query string
    let queryObj = {} as ExtendedObject;
    for(let i = 0; i < Object.keys(req.query).length; i++){
      // Create key and value pairs that will be used next, using regex for a more loose search
      queryObj[Object.keys(req.query)[i]] = { $regex: `${Object.values(req.query)[i]}`, $options: 'i'};
    }
    
    const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
    const tools = await toolsCollection.find(queryObj);

    // If the database is empty
    if(tools.length == 0){
      return res.status(404).json(errorNotFound);
    }

    return res.json(ToolView.renderMany(tools));
  },

  async show(req: Request, res: Response){
    // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
      const tool = await toolsCollection.findOne({ _id: req.params.id });

      // If its not found
      if(tool == null){
        return res.status(404).json(errorNotFound);
      }

      return res.json(ToolView.render(tool));
    }
  },

  async create(req: Request, res: Response){
    // Recover data in Tool format
    const data = {
      ...req.body
    } as Tool;
    

    // Checks whether the data sent is valid
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().required(),
      description: Yup.string().required(),
      tags: Yup.array().of(
        Yup.string()
      ).required()
    }); 
    await schema.validate(data, { abortEarly: false });

    const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
    const tool = await toolsCollection.create(data);
  
    return res.status(201).json(ToolView.render(tool));
  },

  async update(req: Request, res: Response){
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const data = {
        ...req.body
      } as Tool;

      const schema = Yup.object().shape({
        title: Yup.string().min(1),
        link: Yup.string().min(1),
        description: Yup.string().min(1),
        tags: Yup.array().of(
          Yup.string()
        ).min(1)
      }); 
      await schema.validate(data, {abortEarly: false});

      const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
      const tool = await toolsCollection.findOneAndUpdate({ _id: req.params.id}, {$set: data});

      if(tool == null){
        return res.status(404).json(errorNotFound);
      }
      
      return res.status(200).json(ToolView.render(tool));
    }
  },

  async remove(req: Request, res: Response){
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
      const tool = await toolsCollection.deleteOne({ _id: req.params.id });

      if(tool.deletedCount == 0){
        return res.status(404).json(errorNotFound);
      }

      return res.status(204).json();
    }
  }
};