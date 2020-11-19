import { Router } from 'express';
import firstTimeController from '../controllers/firstTimeController';


const routes = Router();

routes.post('/first-time', firstTimeController.create);

export default routes;