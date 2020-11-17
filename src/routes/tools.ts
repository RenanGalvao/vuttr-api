import { Router } from 'express';

import toolsController from '../controllers/tools';


const routes = Router();

routes.get('/tools', toolsController.index);
routes.get('/tools/:id', toolsController.show);
routes.post('/tools', toolsController.create);
routes.put('/tools/:id', toolsController.update);
routes.delete('/tools/:id', toolsController.remove);

export default routes;