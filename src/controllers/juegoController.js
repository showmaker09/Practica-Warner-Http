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

// Aquí irían las funciones para actualizar y eliminar...