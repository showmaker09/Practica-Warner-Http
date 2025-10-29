import { Router } from 'express';
import {
  createUsuarioService,
  getAllUsuariosService,
  getUsuarioByIdService
} from '../services/usuarios.service.js';

const router = Router();

// --- Ruta POST (Crear un nuevo usuario) ---
router.post('/', createUsuarioService);

// --- Ruta GET (Obtener todos los usuarios con su conteo de recetas) ---
router.get('/', getAllUsuariosService);

// --- NUEVA RUTA GET (Buscar usuario por ID) ---
router.get('/:id', getUsuarioByIdService);

export default router;