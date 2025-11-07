// Archivo: src/controllers/juegoController.js

import * as Juego from '../models/juegoModel.js';

// Muestra la página de administración con todos los juegos
export const mostrarAdminJuegos = async (req, res) => {
    try {
        const juegos = await Juego.getAllJuegos();
        // Renderiza la vista EJS y le pasa la lista de juegos
        res.render('admin_juegos', { juegos: juegos });
    } catch (error) {
        res.status(500).send('Error al obtener los juegos');
    }
};

// Lógica para crear un juego (se llamará desde un formulario)
export const agregarJuego = async (req, res) => {
    try {
        const { nombre, modo, tipo } = req.body;
        await Juego.createJuego(nombre, modo, tipo);
        res.redirect('/admin/juegos'); // Redirige de vuelta a la página de admin
    } catch (error) {
        res.status(500).send('Error al agregar el juego');
    }
};

export const actualizarJuego = async (req, res) => 
{
    try {
        const { id } = req.params;
        const { nombre, modo, tipo } = req.body;
        const exito = await Juego.updateJuego(id, nombre, modo, tipo);
        if (exito) {
            res.redirect('/admin/juegos'); // Redirige de vuelta a la página de admin
        } else 
        {
            res.status(404).send('Juego no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al actualizar el juego');
    }
};

// Lógica para eliminar un juego
export const eliminarJuego = async (req, res) => 
{
    try {
        const { id } = req.params;
        const exito = await Juego.deleteJuego(id);
        if (exito) {
            // Para una API RESTful, es común devolver un 200 OK o 204 No Content.
            // Si se llama desde el frontend con fetch, esto es ideal.
            res.json({ message: 'Juego eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el juego' });
    }
};