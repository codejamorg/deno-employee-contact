// routes.ts
import express, { Request, Response } from 'express';
import services from './services.ts';
import middleware from './middleware.ts';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello From CodeJam' }).status(200);
});

router.get('/api/', (req: Request, res: Response) => {
  services.getAllEmployees().then((data) => {
    res.json(data).status(200);
  });
});

router.get('/api/:id', (req: Request, res: Response) => {
  services.getEmployeeById(req.params.id).then((data) => {
    res.json(data).status(200);
  });
});

router.post('/api/', middleware.validateEmployee, (req: Request, res: Response) => {
  services.addEmployee(req.body).then((data) => {
    res.json(data).status(201);
  });
});

router.delete('/api/:id', (req: Request, res: Response) => {
  services.removeEmployee(req.params.id).then((data) => {
    res.json(data).status(204);
  });
});

export default router;
