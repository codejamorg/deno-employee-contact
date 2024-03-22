import { IEmployee } from './types.ts';

const kv = await Deno.openKv();

async function getById(id: string) {
  const key = ['employees', id];
  return await kv.get(key);
}

async function getAll() {
  const iter = await kv.list({ prefix: ['employees'] });
  const employees = [];
  for await (const res of iter) employees.push(res);
  return employees;
}

async function getManyById(ids: string[]) {
  return await kv.getMany(ids);
}

async function removeById(id: string) {
  const key = ['employees', id];
  const res = await kv.delete(key);
  return 'Employee removed';
}

async function save(id: string, employee: IEmployee) {
  const key = ['employees', id];
  const newEmployee = { ...employee, id };
  const res = await kv.atomic().check({ key, versionstamp: null }).set(key, newEmployee).commit();
  if (res.ok) {
    return getById(id);
  } else {
    throw new Error('Failed to save');
  }
}

export default {
  getById,
  getAll,
  getManyById,
  removeById,
  save,
};
