import { mysqlConfig } from '@/app/config/mysql';
import mysql from 'mysql2/promise';

export const dbConfig = mysqlConfig;

export async function createConnection() {
  return await mysql.createConnection(dbConfig);
}