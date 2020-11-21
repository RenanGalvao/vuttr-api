/*
* This file defines what information will be returned to the user. 
* if you want something not to go to the user, just omit the object's key and value.
*/
import Tool from '../interfaces/toolsInterface';

export default {

  render(tool: Tool | null){
    let viewObj = {
      _id: tool?._id,
      title: tool?.title,
      link: tool?.link,
      description: tool?.description,
      tags: tool?.tags,
    } as Tool;

    return viewObj;
  },

  renderMany(tools: Tool[]){
    return tools.map(tool => this.render(tool));
  }
};