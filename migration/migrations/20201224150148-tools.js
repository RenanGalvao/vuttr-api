const { id } = require('./20201224150147-users');

module.exports = {
  async up(db, client) {
    await db.collection('tools').insertMany([
    {
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
      userId: id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(), 
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
      userId: id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(), 
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
      userId: id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(), 
    }]);
  },

  async down(db, client) {
    await db.collection('tools').drop();
  }
};
