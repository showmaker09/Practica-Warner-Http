// Archivo: src/controllers/usuarioController.js

import * as Usuario from '../models/usuarioModel.js';

// Muestra la página de administración con todos los usuarios
export const mostrarAdminUsuarios = async (req, res) => 
    
{
    try {   
        const usuarios = await Usuario.getAllUsuarios();
        // Renderiza la nueva vista EJS que crearemos y le pasa la lista de usuarios
        res.render('admin_usuarios', { usuarios: usuarios });
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

// --- Aquí irían las funciones para agregar, modificar y eliminar usuarios ---
  
// Archivo: src/controllers/usuarioController.js
// ... (al final del archivo, después de mostrarAdminUsuarios)

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => 
{
    try {
        const { id } = req.params; // Obtenemos el ID de la URL
        const exito = await Usuario.deleteById(id);
        if (exito) {
            res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
};


// Actualizar un usuario
// Archivo: src/controllers/usuarioController.js
// ... (al final del archivo)

// Actualizar un usuario
export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, edad } = req.body;
        const exito = await Usuario.updateById(id, nombre, correo, edad);
        if (exito) {
            res.json({ message: 'Usuario actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
};