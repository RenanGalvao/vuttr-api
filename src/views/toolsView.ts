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