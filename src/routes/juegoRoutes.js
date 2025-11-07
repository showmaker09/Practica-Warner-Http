// Archivo: src/routes/juegoRoutes.js

import { Router } from 'express';
import { mostrarAdminJuegos, agregarJuego,actualizarJuego, eliminarJuego} from '../controllers/juegoController.js';

const router = Router();

// Ruta para mostrar la página de administración de juegos
router.get('/', mostrarAdminJuegos);

// Ruta para procesar el formulario de alta de un nuevo juego
router.post('/', agregarJuego);
router.put('/:id', actualizarJuego);
router.delete('/:id', eliminarJuego);

// Aquí irían las rutas para PUT (modificar) y DELETE (baja)
// router.post('/update/:id', ...);
// router.post('/delete/:id', ...);

export default router;