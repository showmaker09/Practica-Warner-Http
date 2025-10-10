// Archivo: src/models/usuarioModel.js

import pool from './db.js';

// Obtener todos los usuarios
export const getAllUsuarios = async () => 
{
  const [rows] = await pool.query('SELECT * FROM Usuario');
  return rows;
};

// --- Aquí podrías agregar las funciones para crear, actualizar y eliminar usuarios en el futuro ---
// export const createUsuario = async (nombre, correo, edad) => { ... };

// Archivo: src/models/usuarioModel.js
// ... (al final del archivo, después de getAllUsuarios)

// Eliminar un usuario por su ID
export const deleteById = async (id) => 
{
    const [result] = await pool.query('DELETE FROM Usuario WHERE IDUsuario = ?', [id]);
    // affectedRows será 1 si se eliminó, 0 si no se encontró
    return result.affectedRows > 0;
    
};


// Actualizar un usuario por su ID
export const updateById = async (id, nombre, correo, edad) =>
{
    const [result] = await pool.query(
        'UPDATE Usuario SET Nombre = ?, CorreoElectronico = ?, Edad = ? WHERE IDUsuario = ?',
        [nombre, correo, edad, id]
    );
    return result.affectedRows > 0;
};