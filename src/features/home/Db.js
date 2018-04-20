import Dexie from 'dexie';

const db = new Dexie('mydb');
db.version(1).stores({
  todo: '++id, description, &createTime, status',
});

export default db;
