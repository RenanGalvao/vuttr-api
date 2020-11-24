"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
* Works when the application is started for the first time or after the API database is deleted.
*/
const mongoose_1 = __importDefault(require("mongoose"));
const toolsSchema_1 = __importDefault(require("../schemas/toolsSchema"));
function createDatabase() {
    const toolsCollection = mongoose_1.default.model('tools', toolsSchema_1.default);
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
}
exports.default = createDatabase;
;
