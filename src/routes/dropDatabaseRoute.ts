import { Router } from 'express';
import mongoose from 'mongoose';

const routes = Router();
routes.delete('/drop-database/:assertive', async (req, res) => {
  if(req.params.assertive == 'yes'){

    mongoose.connection.db.dropDatabase();
    const collectionsIndatabase = await mongoose.connection.db.listCollections().toArray();
    if(collectionsIndatabase.length == 0){
      return res.status(204).json();
    }else{
      return res.status(500).json();
    }
  }else{
    return res.status(400).json();
  }
});

export default routes;