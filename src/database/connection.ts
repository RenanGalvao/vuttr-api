import mongoose from 'mongoose';
import config from '../configs/main';
import databaseConfig from '../configs/database';
import createDatabase from './buildNecessaryDatabase';

(async () => {
  await mongoose.connect(`${config.mongoURL}`, databaseConfig);
  mongoose.set('returnOriginal', false);

  // Create the database if there's none.
  // Keep in mind that each environment has its own database.
  // test: vuttr-test, dev: vuttr-dev, prod: vuttr.
  const collectionsIndatabase = await mongoose.connection.db.listCollections().toArray();
  if(collectionsIndatabase.length == 0){
    createDatabase();
  }

  if(config.envName == 'test'){
    mongoose.connection.db.dropDatabase();
  }
})();