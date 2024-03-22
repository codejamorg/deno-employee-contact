// routes.ts
import express, { Request, Response } from 'express';
import middleware from './middleware.ts';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello From CodeJam' }).status(200);
});

router.get('/api/', (req: Request, res: Response) => {});

router.get('/api/:id', (req: Request, res: Response) => {});

router.post('/api/', middleware.validateEmployee, (req: Request, res: Response) => {});

router.delete('/api/:id', (req: Request, res: Response) => {});

export default router;
