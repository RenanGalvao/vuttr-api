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
    toolsCollection.find(queryObj, (err, tools) => {

      if(tools.length == 0){
        return res.status(404).json({message: 'Tool not found!'});
      }

      toolsCollection.populate(tools, {
        path: 'field', 
        select: [
          'continent', 
          'country',
          'state',
          'abbreviation',
          'designation',
        ]
      }, (err, data) => {
        
        
        return res.json(ToolView.renderMany(data));

      });
    });
  },

  async show(req: Request, res: Response){
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
      toolsCollection.findOne({ _id: req.params.id }, (err, admin) => {

        if(admin == null){
          return res.status(404).json({message: 'Tool not found!'});
        }

        toolsCollection.populate(admin, {
          path: 'field',
          select: [
            'continent', 
            'country',
            'state',
            'abbreviation',
            'designation',
          ]
        }, (err, data) => {

          return res.json(ToolView.render(admin));

        });
      });
    }
  },

  async create(req: Request, res: Response){
    const data = {
      ...req.body
    } as Tool;
    
    if(!req.body.field) throw new Yup.ValidationError('Field is required', '', 'field');
    const fieldExists = await fieldExistsInDataBase(req.body.field);
    if(!fieldExists) throw new Yup.ValidationError('Field not found', '', 'field');
    
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      role: Yup.string().equals(['admin', 'webmaster']).required(),
    }); 
    await schema.validate(data, { abortEarly: false });

    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);
    data.last_login = new Date();

    const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
    const admin = await toolsCollection.create(data);
    
  
    return res.status(201).json(ToolView.render(admin));
  },

  async update(req: Request, res: Response){
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const data = {
        ...req.body
      } as Tool;

      if(!req.body.field) throw new Yup.ValidationError('Field is Required', '', 'field');
      const fieldExists = await fieldExistsInDataBase(req.body.field);
      if(!fieldExists) throw new Yup.ValidationError('Field not found', '', 'field');

      const schema = Yup.object().shape({
        name: Yup.string().optional().min(1),
        email: Yup.string().optional().email().min(1),
        password: Yup.string().optional().min(1),
        role: Yup.string().equals(['admin', 'webmaster']).optional(),
      }); 
      await schema.validate(data, {abortEarly: false});

      if(data.password){
        const saltRounds = 10;
        data.password = await bcrypt.hash(data.password, saltRounds);
      }

      const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
      const admin = await toolsCollection.findOneAndUpdate({ _id: req.params.id}, {$set: data});

      if(admin == null){
        throw new ConsumerError('Tool not found!', 404);
      }

      
      return res.status(200).json(ToolView.render(admin));
    }
  },

  async remove(req: Request, res: Response){
    if(mongoose.Types.ObjectId.isValid(new mongoose.Types.ObjectId(req.params.id))){
      const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
      
      const admin = await toolsCollection.findOneAndDelete({ _id: req.params.id });

      if(admin == null){
        throw new ConsumerError('Tool not found!', 404);
      }

      return res.status(200).json(ToolView.render(admin));
    }
  }
};