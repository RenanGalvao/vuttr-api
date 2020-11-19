import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Yup from 'yup';

import ToolsSchema from '../schemas/toolsSchema';
import ToolView from '../views/toolsView';
import Tool from '../interfaces/toolsInterface';

import ExtendedObject from '../interfaces/objectThatAcceptsStringIndexes';

export default {
  async index(req: Request, res: Response){

    let queryObj = {} as ExtendedObject;
    for(let i = 0; i < Object.keys(req.query).length; i++){
      queryObj[Object.keys(req.query)[i]] = Object.values(req.query)[i];
    }

    const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
    const tools = await toolsCollection.find(queryObj);

      if(tools.length == 0){
        return res.status(404).json({message: 'Tools not found!'});
      }

    return res.json(ToolView.renderMany(tools));
  },

  async show(req: Request, res: Response){
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
      const tool = await toolsCollection.findOne({ _id: req.params.id });

      if(tool == null){
        return res.status(404).json({message: 'Tool not found!'});
      }

      return res.json(ToolView.render(tool));
    }
  },

  async create(req: Request, res: Response){
    const data = {
      ...req.body
    } as Tool;
    
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
        title: Yup.string(),
        link: Yup.string(),
        description: Yup.string(),
        tags: Yup.array().of(
          Yup.string()
        )
      }); 
      await schema.validate(data, {abortEarly: false});

      const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
      const tool = await toolsCollection.findOneAndUpdate({ _id: req.params.id}, {$set: data});

      if(tool == null){
        return res.status(404).json({message: 'Tool not found!'});
      }
      
      return res.status(200).json(ToolView.render(tool));
    }
  },

  async remove(req: Request, res: Response){
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
      const tool = await toolsCollection.findOneAndDelete({ _id: req.params.id });

      if(tool == null){
        return res.status(404).json({message: 'Tool not found!'});
      }

      return res.status(204).json();
    }
  }
};