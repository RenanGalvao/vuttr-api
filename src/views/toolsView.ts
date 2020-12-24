/*
* This file defines what information will be returned to the user. 
* if you want something not to go to the user, just omit the object's key and value.
*/
import Tool from '../interfaces/toolsInterface';
import { Response } from 'express';
import ExtendedRequest from '../interfaces/extendedRequestInterface';
import { isAuthorized } from '../lib/helpers';

export default function ToolView(data: Tool | Tool[] | null, req: ExtendedRequest, res: Response) {
  // If empty
  if(data == null || data instanceof Array && data.length == 0){
    return res.status(404).json(errorNotFound);
  }
  else if(data instanceof Array){
    return res.json(renderMany(data, req));
  }
  else{
    const status = req.method == 'POST' ? 201 : req.method == 'DELETE' ? 204 : 200;
    return res.status(status).json(render(data, req));
  }
  
};

const errorNotFound = {
  error: 'Error',
  message: 'Tool(s) not found.',
};

function renderMany(tools: Tool[], req: ExtendedRequest){
  return tools.map(tool => render(tool, req));
}

function render(tool: Tool | null, req: ExtendedRequest){
  let viewObj = {
    id: tool?._id,
    title: tool?.title,
    link: tool?.link,
    description: tool?.description,
    tags: tool?.tags,
  } as Tool;

  if(isAuthorized(req)){
    viewObj = {
      ...viewObj,
      created_at: tool?.created_at,
      updated_at: tool?.updated_at,
    } as Tool;
  }

  return viewObj;
}