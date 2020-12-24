import mongoose from 'mongoose';
import config from '../configs/main';
import databaseConfig from '../configs/database';

(async () => {
  await mongoose.connect(`${config.mongoURL}`, databaseConfig);
  // Returns the modified doc with findOneAndUpdate
  mongoose.set('returnOriginal', false);
})();