// Archivo: src/routes/usuarioRoutes.js

import { Router } from 'express';
import { mostrarAdminUsuarios,eliminarUsuario, actualizarUsuario, registerUsuario} from '../controllers/usuarioController.js';

const router = Router();

// Ruta para mostrar la página de administración de usuarios
router.get('/', mostrarAdminUsuarios);
router.delete( '/:id', eliminarUsuario );
router.put( '/:id',  actualizarUsuario );
router.post('/register', registerUsuario);

// --- Aquí irían las rutas para POST (crear), etc. ---

export default router;


