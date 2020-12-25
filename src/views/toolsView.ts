/*
* This file defines what information will be returned to the user. 
* if you want something not to go to the user, just omit the object's key and value.
*/
import Tool from '../interfaces/toolsInterface';
import { Request, Response } from 'express';
import { isAuthorized } from '../lib/helpers';
import { debuglog, formatWithOptions } from 'util';

// Setting debug name for the file
const debug = debuglog('tools-view');

export default function ToolView(data: Tool | Tool[] | null, req: Request, res: Response) {
  debug(formatWithOptions({colors: true}, '[TOOL_VIEW][INPUT] Data: %O\nRequest Method: %O\nResponse Locals: %O', data, req.method, res.locals));

  // Does the user has a valid jwt?
  let isUserAuthorized = isAuthorized(res);

  // If empty
  if(data == null || data instanceof Array && data.length == 0){
    debug(formatWithOptions({colors: true}, '[TOOL_VIEW][OUTPUT] Status: %O \n JSON: %O', 404, errorNotFound));
    return res.status(404).json(errorNotFound);
  }
  // Array
  else if(data instanceof Array){
    const jsonResponse = renderMany(data, isUserAuthorized);
    debug(formatWithOptions({colors: true}, '[TOOL_VIEW][OUTPUT] Status: %O \n JSON: %O', 200, jsonResponse));
    return res.json(jsonResponse);
  }
  // One
  else{
    const status = req.method == 'POST' ? 201 : req.method == 'DELETE' ? 204 : 200;
    const jsonResponse = render(data, isUserAuthorized);
    debug(formatWithOptions({colors: true}, '[TOOL_VIEW][OUTPUT] Status: %O \n JSON: %O', status, jsonResponse));
    return res.status(status).json(jsonResponse);
  }
  
};

const errorNotFound = {
  error: 'Error',
  message: 'Tool(s) not found.',
};

function renderMany(tools: Tool[], isAuthorized: boolean){
  return tools.map(tool => render(tool, isAuthorized));
}

function render(tool: Tool | null, isAuthorized: boolean){
  let viewObj = {
    id: tool?._id,
    title: tool?.title,
    link: tool?.link,
    description: tool?.description,
    tags: tool?.tags,
  } as Tool;

  if(isAuthorized){
    viewObj = {
      ...viewObj,
      created_at: tool?.created_at,
      updated_at: tool?.updated_at,
    } as Tool;
  }

  return viewObj;
}