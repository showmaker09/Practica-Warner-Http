// Archivo: src/routes/juegoRoutes.js

import { Router } from 'express';
import { mostrarAdminJuegos, agregarJuego } from '../controllers/juegoController.js';

const router = Router();

// Ruta para mostrar la página de administración de juegos
router.get('/', mostrarAdminJuegos);

// Ruta para procesar el formulario de alta de un nuevo juego
router.post('/', agregarJuego);

// Aquí irían las rutas para PUT (modificar) y DELETE (baja)
// router.post('/update/:id', ...);
// router.post('/delete/:id', ...);

export default router;