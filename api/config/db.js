import mysql from 'mysql2/promise';

// Crea y exporta la conexión a la base de datos
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'recetas',
  port: 3307,
});
