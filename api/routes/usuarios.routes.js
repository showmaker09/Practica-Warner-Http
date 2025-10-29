import { Router } from 'express';
import {
  createUsuarioService,
  getAllUsuariosService
} from '../services/usuarios.service.js';

const router = Router();

// --- Ruta POST (Crear un nuevo usuario) ---
router.post('/', createUsuarioService);

// --- Ruta GET (Obtener todos los usuarios con su conteo de recetas) ---
router.get('/', getAllUsuariosService);

export default router;