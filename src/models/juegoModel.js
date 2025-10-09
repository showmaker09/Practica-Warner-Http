// Archivo: src/models/juegoModel.js

import pool from './db.js'; // Importamos la conexión

// Obtener todos los juegos
export const getAllJuegos = async () => {
  const [rows] = await pool.query('SELECT * FROM Juego');
  return rows;
};

// Crear un nuevo juego
export const createJuego = async (nombre, modo, tipo) => {
  const [result] = await pool.query(
    'INSERT INTO Juego (Nombre, Modo, Tipo) VALUES (?, ?, ?)',
    [nombre, modo, tipo]
  );
  return result.insertId;
};

// Modificar un juego existente
export const updateJuego = async (id, nombre, modo, tipo) => {
    const [result] = await pool.query(
        'UPDATE Juego SET Nombre = ?, Modo = ?, Tipo = ? WHERE IDJuego = ?',
        [nombre, modo, tipo, id]
    );
    return result.affectedRows > 0;
};

// Eliminar un juego
export const deleteJuego = async (id) => {
    const [result] = await pool.query('DELETE FROM Juego WHERE IDJuego = ?', [id]);
    return result.affectedRows > 0;
};