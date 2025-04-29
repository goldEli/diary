
export const mysqlConfig = {
  host: process.env.NODE_ENV === 'development' ? 'localhost' : 'diary-mysql',
  user: "root",
  password: "123456",
  database: "diary",
}