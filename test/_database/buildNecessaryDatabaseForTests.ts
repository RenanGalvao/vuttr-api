import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import '../../src/database/connection';

import UserSchema from '../../src/schemas/usersSchema';
import User from '../../src/interfaces/usersInterface';

import ToolsSchema from '../../src/schemas/toolsSchema';
import Tool from '../../src/interfaces/toolsInterface';

const userCredentials = {
  email: 'assis.machado@gmail.com',
  password: 'quincasborbamaiorfilosofo',
} as User;

let userData = {
  name: 'Machado de Assis',
  email: 'assis.machado@gmail.com',
  password: '',
} as User;


export { userCredentials};


describe('Creating database for testing', () => {
  
  /*
  it('User Collection', async () => {

    const usersCollection = mongoose.model<User>('users', UserSchema);
    await usersCollection.create({
      ...userData,
      password: await bcrypt.hash(userCredentials.password, 10),
    });
  });
  */
  it('Tool Collection', async () => {

    const toolsCollection = mongoose.model<Tool>('tools', ToolsSchema);
    await toolsCollection.create({
      title: 'ExpressJS Async Errors',
      link: 'https://www.npmjs.com/package/express-async-errors',
      description: 'A dead simple ES6 async/await support hack for ExpressJS',
      tags: [
        'expressjs',
        'async',
        'await',
        'es6',
      ],
    });
  });
});