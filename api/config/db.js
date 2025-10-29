import mysql from 'mysql2/promise';

// Crea y exporta la conexión a la base de datos usando variables de entorno
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});
