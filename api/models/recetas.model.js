import { pool } from '../config/db.js';

// Modelo para obtener todas las recetas
export const getRecetasModel = async () => {
  const [rows] = await pool.query('SELECT * FROM recetas');
  return rows;
};

// Modelo para crear una nueva receta
export const createRecetaModel = async (newReceta) => {
  const { nombre, descripcion, id_usuario } = newReceta;
  const [result] = await pool.query(
    'INSERT INTO recetas (nombre, descripcion, id_usuario, fecha_creacion) VALUES (?, ?, ?, NOW())',
    [nombre, descripcion, id_usuario]
  );
  return result.insertId;
};
