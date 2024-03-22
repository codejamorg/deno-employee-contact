// services.ts
import { IEmployee } from './types.ts';
import repository from './repository.ts';
import { generate } from 'https://deno.land/std@0.62.0/uuid/v4.ts';

const addEmployee = (employee: IEmployee) => {
  const employeeId = generate();
  return repository.save(employeeId, employee);
};

const getEmployeeById = (id: string) => {
  return repository.getById(id);
};

const getAllEmployees = () => {
  return repository.getAll();
};

const removeEmployee = (id: string) => {
  return repository.removeById(id);
};

export default {
  addEmployee,
  getEmployeeById,
  getAllEmployees,
  removeEmployee,
};
