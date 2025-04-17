import mysql from 'mysql2/promise';

export const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'diary'
};

export async function createConnection() {
  return await mysql.createConnection(dbConfig);
}