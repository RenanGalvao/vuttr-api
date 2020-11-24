/*
* Works when the application is started for the first time or after the API database is deleted.
*/
import mongoose from 'mongoose';
import ToolsSchema from '../schemas/toolsSchema';
import Tool from '../interfaces/toolsInterface';

export default function createDatabase(): void {

  const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
  toolsCollection.create([{
    title: 'Notion',
    link: 'https://notion.so',
    description: 'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized.',
    tags: [
      'organization',
      'planning',
      'collaboration',
      'writing',
      'calendar',
    ],
  }, {
    title: 'Json-Server',
    link: 'https://github.com/typicode/json-server',
    description: 'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
    tags: [
      'api',
      'json',
      'schema',
      'node',
      'github',
      'rest',
    ],
  }, {
    title: 'Fastify',
    link: 'https://www.fastify.io/',
    description: 'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
    tags: [
      'web',
      'framework',
      'node',
      'http2',
      'https',
      'localhost',
    ],
  }]);

  console.log('Database created.');
};