import mysql from "mysql2/promise";

console.log("Creating connection pool ...");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DBNAME,
  password: process.env.DB_PASSWORD,
});

export default pool;
