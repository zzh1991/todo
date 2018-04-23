import db from './Db';

export const saveData = async (data) => {
  await db.todo.add(data);
};

export const updateData = async (data) => {
  await db.todo.put(data);
};

export const selectData = async (status) => {
  const data = await db.todo
    .where('status')
    .equals(status)
    .toArray();
  return data;
};
