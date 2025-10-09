import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;

try {
  // Creamos un "pool" de conexiones
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Intentamos obtener una conexión para probar que todo funciona
  await pool.getConnection();
  console.log('🔌 Conexión a la base de datos MySQL establecida exitosamente.');

} catch (error) {
  console.error('❌ Error al conectar a la base de datos:');
  console.error(`Asegúrate de que la base de datos esté corriendo y que las credenciales en el archivo .env sean correctas.`);
  console.error(`Detalle del error: ${error.message}`);
  // Detenemos la aplicación si no se puede conectar a la base de datos
  process.exit(1);
}

export default pool;