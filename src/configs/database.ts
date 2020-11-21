/*
* Mongoose connection options
*/
import { ConnectionOptions } from 'mongoose';

export default {
  keepAlive: true, 
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
} as ConnectionOptions;