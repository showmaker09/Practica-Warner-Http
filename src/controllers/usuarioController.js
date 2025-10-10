// Archivo: src/controllers/usuarioController.js

import * as Usuario from '../models/usuarioModel.js';

// Muestra la página de administración con todos los usuarios
export const mostrarAdminUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAllUsuarios();
        // Renderiza la nueva vista EJS que crearemos y le pasa la lista de usuarios
        res.render('admin_usuarios', { usuarios: usuarios });
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
};

// --- Aquí irían las funciones para agregar, modificar y eliminar usuarios ---
  
