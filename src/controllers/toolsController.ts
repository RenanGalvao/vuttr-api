import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as Yup from 'yup';
import toolCollection from '../models/toolModel';
import toolView from '../views/toolsView';
import Tool from '../interfaces/toolsInterface';
import { createFilter } from '../lib/helpers'
import { debuglog, formatWithOptions } from 'util';

// Setting debug name for the file
const debug = debuglog('tools');

export default {

  // [GET] Returns all route data according to the filter
  async index(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[TOOLS][GET] Request Body: %O\nResponse Locals:', req.body, res.locals));
    
    // Get filters if any
    const { skip, limit, order, field, queryConditions } = createFilter(req.query);
    const tools = await toolCollection.find(queryConditions).limit(limit).skip(skip).sort({[field]: order});;

    res.setHeader('X-Total-Count', tools.length);
    return toolView(tools, req, res);
  },

  async show(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[TOOLS][GET] Request Body: %O\nResponse Locals:', req.body, res.locals));

    // Argument passed in must be a single String of 12 bytes or a string of 24 hex characters
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      
      const tool = await toolCollection.findOne({ _id: req.params.id });
      return toolView(tool, req, res);
    }
  },

  // [POST]
  async create(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[TOOLS][POST] Request Body: %O\nResponse Locals:', req.body, res.locals));
    
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
    return toolView(tool, req, res);
  },

  // [PUT]
  async update(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[TOOLS][PUT] Request Body: %O\nResponse Locals:', req.body, res.locals));
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      
      const data = {
        ...req.body
      } as Tool;

      const schema = Yup.object().shape({
        title: Yup.string().optional().min(1),
        link: Yup.string().optional().min(1),
        description: Yup.string().optional().min(1),
        tags: Yup.array().of(
          Yup.string().min(1),
        ).min(1)
      }); 
      await schema.validate(data, {abortEarly: false});

      const tool = await toolCollection.findOneAndUpdate({ _id: req.params.id}, {$set: data});
      return toolView(tool, req, res);
    }
  },

  // [DELETE]
  async remove(req: Request, res: Response){
    debug(formatWithOptions({colors: true}, '[TOOLS][DELETE] Request Body: %O\nResponse Locals:', req.body, res.locals));
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      
      await toolCollection.deleteOne({ _id: req.params.id });
      return res.status(204).end();
    }
  }
};