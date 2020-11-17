import mongoose from 'mongoose';
import databaseConfig from '../configs/database';

(async () => {
  await mongoose.connect(`${process.env.MONGO_URL}`, databaseConfig);
  mongoose.set('returnOriginal', false);

  if(process.env.NODE_ENV == 'test'){
    mongoose.connection.db.dropDatabase();
  }
})();