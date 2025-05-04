
export const mysqlConfig = {
  host: process.env.NODE_ENV === 'development' ? 'localhost' : 'diary-mysql',
  user: "root",
  password: process.env.MYSQL_PASSWORD || "123456",
  database: "diary",
}