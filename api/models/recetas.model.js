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

// (Asegúrate de importar 'pool' como lo tienes en tu captura)
import { pool } from '../config/db.js';

// --- FUNCIÓN PARA GET (Obtener todas las recetas) ---
// (Esta es la que ya tienes)
export const findAllRecetas = async () => {
  const [rows] = await pool.query('SELECT * FROM recetas');
  return rows;
};

// --- NUEVAS FUNCIONES PARA GET por ID (Usando 'pool') ---

// 1. Busca la receta principal
export const findRecetaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM recetas WHERE id_receta = ?', [id]);
  return rows[0]; // Devuelve solo el primer resultado (o undefined)
};

// 2. Busca los ingredientes de esa receta
export const findIngredientesByRecetaId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM ingredientes WHERE id_receta = ?', [id]);
  return rows;
};

// 3. Busca los pasos de esa receta (ordenados)
export const findPasosByRecetaId = async (id) => {
  const [rows] = await pool.query('SELECT * FROM pasos WHERE id_receta = ? ORDER BY numero_paso ASC', [id]);
  return rows;
};

// --- NUEVA FUNCIÓN PARA PUT (Usando 'pool') ---
export const updateRecetaModel = async (id, recetaDatos) => {
  const { nombre, descripcion } = recetaDatos;
  const [result] = await pool.query(
    'UPDATE recetas SET nombre = ?, descripcion = ? WHERE id_receta = ?',
    [nombre, descripcion, id]
  );
  return result.affectedRows; // Devuelve 1 si se actualizó, 0 si no
};
