import { IEmployee } from './types.ts';

async function getById(id: string) {}

async function getAll() {}

async function getManyById(ids: string[][]) {}

async function removeById(id: string) {}

async function save(id: string, employee: IEmployee) {}

export default {
  getById,
  getAll,
  getManyById,
  removeById,
  save,
};
