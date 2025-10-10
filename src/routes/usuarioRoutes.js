// Archivo: src/routes/usuarioRoutes.js

import { Router } from 'express';
import { mostrarAdminUsuarios } from '../controllers/usuarioController.js';

const router = Router();

// Ruta para mostrar la página de administración de usuarios
router.get('/', mostrarAdminUsuarios);

// --- Aquí irían las rutas para POST (crear), etc. ---

export default router;