// Archivo: src/controllers/usuarioController.js

import * as Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

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


//Registrar un nuevo usuario del frontend de Flor
export const registerUsuario = async (req, res) => {
    try {
        // Capturamos 'edad' en lugar de 'dob'
        const { username, email, password, edad } = req.body;
        const emailExistente = await Usuario.findByEmail(email);
        if (emailExistente) {
            return res.status(409).json({ message: 'El correo electrónico ya está registrado.' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Enviamos 'edad' al modelo ya que la función createUsuario ha sido actualizada
        const nuevoUsuarioId = await Usuario.createUsuario(username, email, passwordHash, edad);
        if (!nuevoUsuarioId) {
             return res.status(500).json({ message: 'Error al crear el usuario en la base de datos.' });
        }

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente',
            userId: nuevoUsuarioId,
            username: username
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor al registrar el usuario.' });
    }
};
