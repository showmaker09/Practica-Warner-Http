// Archivo: src/routes/usuarioRoutes.js

import { Router } from 'express';
import { mostrarAdminUsuarios,eliminarUsuario, actualizarUsuario} from '../controllers/usuarioController.js';

const router = Router();

// Ruta para mostrar la página de administración de usuarios
router.get('/', mostrarAdminUsuarios);
router.delete( '/:id', eliminarUsuario );
router.put( '/:id',  actualizarUsuario );

// --- Aquí irían las rutas para POST (crear), etc. ---

export default router;


