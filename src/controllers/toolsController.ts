import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Yup from 'yup';
import toolCollection from '../models/toolModel';
import ToolView from '../views/toolsView';
import Tool from '../interfaces/toolsInterface';
import { createFilter } from '../lib/helpers'

export default {

  // Returns all route data or according to the filter
  async index(req: Request, res: Response){
    
    // Get filters if any
    const { skip, limit, order, field, queryConditions } = createFilter(req.query);
    const tools = await toolCollection.find(queryConditions).limit(limit).skip(skip).sort({[field]: order});;

    res.setHeader('X-Total-Count', tools.length);
    return ToolView(tools, req, res);
  },

  async show(req: Request, res: Response){
    // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const tool = await toolCollection.findOne({ _id: req.params.id });
      return ToolView(tool, req, res);
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

    const tool = await toolCollection.create(data);
    return ToolView(tool, req, res);
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

      const tool = await toolCollection.findOneAndUpdate({ _id: req.params.id}, {$set: data});
      return ToolView(tool, req, res);
    }
  },

  async remove(req: Request, res: Response){
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const tool = await toolCollection.deleteOne({ _id: req.params.id });
      return res.status(204).end();
    }
  }
};

const errorNotFound = {
  error: 'Error',
  message: 'Tool(s) not found.'
}
