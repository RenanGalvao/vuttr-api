import { Router, Request, Response } from 'express';
import usersController from '../controllers/usersController';
import verifyJwtMiddleware from '../middlewares/verifyJwtMiddleware';

const routes = Router();

routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);
routes.post('/users', usersController.create);
routes.put('/users/:id', verifyJwtMiddleware, usersController.update);
routes.delete('/users/:id', verifyJwtMiddleware, usersController.remove);

// This tells the user that he cannot use these methods without the id parameter.
routes.put('/users', (req: Request, res: Response) => {
  return res.status(405).json();
});
routes.delete('/users', (req: Request, res: Response) => {
  return res.status(405).json();
});

export default routes;