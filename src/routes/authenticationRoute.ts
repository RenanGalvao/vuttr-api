import { Router } from 'express';
import authenticationController from '../controllers/authenticationController';


const routes = Router();

routes.post('/login', authenticationController.verify);

export default routes;