import { Request, Response, NextFunction } from 'express';
import { IEmployee } from './types.ts';

// Middleware to validate employee object
const validateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const employee: IEmployee = req.body;
  const { name, age, salary, email, phone } = employee;

  if (!name || !age || !salary || !email || !phone) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (
    typeof name !== 'string' ||
    typeof age !== 'number' ||
    typeof salary !== 'number' ||
    typeof email !== 'string' ||
    typeof phone !== 'string'
  ) {
    return res.status(400).json({ message: 'Invalid data type for fields' });
  }
  next();
};

export default {
  validateEmployee,
};
