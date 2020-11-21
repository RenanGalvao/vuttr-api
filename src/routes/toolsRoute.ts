import { Router, Request, Response } from 'express';
import toolsController from '../controllers/toolsController';
import verifyJwtMiddleware from '../middlewares/verifyJwtMiddleware';

const routes = Router();

routes.get('/tools', toolsController.index);
routes.get('/tools/:id', toolsController.show);
routes.post('/tools', verifyJwtMiddleware, toolsController.create);
routes.put('/tools/:id', verifyJwtMiddleware, toolsController.update);
routes.delete('/tools/:id', verifyJwtMiddleware, toolsController.remove);

// This tells the user that he cannot use these methods without the id parameter.
routes.put('/tools', (req: Request, res: Response) => {
  return res.status(405).json();
});
routes.delete('/tools', (req: Request, res: Response) => {
  return res.status(405).json();
});

export default routes;