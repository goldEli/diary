import mysql from 'mysql2/promise';

export const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'diary'
};

export async function createConnection() {
  return await mysql.createConnection(dbConfig);
}