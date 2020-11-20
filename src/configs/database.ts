import { ConnectionOptions } from 'mongoose';

// Mongoose connection options
export default {
  keepAlive: true, 
  keepAliveInitialDelay: 300000,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
} as ConnectionOptions;