import { pool } from '../config/db.js';
// aqui se implementan las codigos SQL  
// --- FUNCIÓN PARA POST (Crear un nuevo usuario) ---
export const createUsuarioModel = async (nuevoUsuario) => {
  const { nombre } = nuevoUsuario; // Asume que el objeto tiene una propiedad 'nombre'
  // Verifica si el nombre ya existe para evitar duplicados (opcional pero recomendado)
  const [existing] = await pool.query('SELECT id_usuario FROM usuarios WHERE nombre = ?', [nombre]);
  if (existing.length > 0) {
    // Puedes lanzar un error o devolver un indicador de que ya existe
    throw new Error(`El usuario con nombre "${nombre}" ya existe.`);
  }
  // Inserta el nuevo usuario
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre) VALUES (?)',
    [nombre]
  );
  return result.insertId; // Devuelve el ID del usuario recién creado
};

// --- FUNCIÓN PARA GET (Obtener todos los usuarios y su conteo de recetas) ---
export const findAllUsuariosWithRecipeCount = async () => 
{
  // Usamos un LEFT JOIN y COUNT para obtener el número de recetas por usuario
  const [rows] = await pool.query(`
    SELECT
      u.id_usuario,
      u.nombre,
      COUNT(r.id_receta) AS cantidad_recetas
    FROM usuarios u
    LEFT JOIN recetas r ON u.id_usuario = r.id_usuario
    GROUP BY u.id_usuario, u.nombre
    ORDER BY u.nombre ASC;
  `);
  return rows;
};