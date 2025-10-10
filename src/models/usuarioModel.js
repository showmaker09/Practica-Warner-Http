// Archivo: src/models/usuarioModel.js

import pool from './db.js';

// Obtener todos los usuarios
export const getAllUsuarios = async () => {
  const [rows] = await pool.query('SELECT * FROM Usuario');
  return rows;
};

// --- Aquí podrías agregar las funciones para crear, actualizar y eliminar usuarios en el futuro ---
// export const createUsuario = async (nombre, correo, edad) => { ... };