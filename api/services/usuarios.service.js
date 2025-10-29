import {
  createUsuarioModel,
  findAllUsuariosWithRecipeCount
} from '../models/usuarios.model.js';

// se exportan las funciones 
// --- FUNCIÓN DE SERVICIO POST (Crear Usuario) ---
export const createUsuarioService = async (req, res) => {
  try {
    const nuevoUsuario = req.body; // Obtiene los datos del cuerpo de la petición (ej: { "nombre": "Pedro" })

    // Validación simple (puedes añadir más validaciones)
    if (!nuevoUsuario.nombre || nuevoUsuario.nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre del usuario es requerido.' });
    }

    const usuarioId = await createUsuarioModel(nuevoUsuario);
    res.status(201).json({ id_usuario: usuarioId, ...nuevoUsuario }); // Devuelve 201 Created
  } catch (error) {
    // Si el modelo lanza el error de "ya existe", lo enviamos como 409 Conflict
    if (error.message.includes("ya existe")) {
      return res.status(409).json({ message: error.message });
    }
    // Otros errores son 500
    res.status(500).json({ message: error.message });
  }
};

// --- FUNCIÓN DE SERVICIO GET (Obtener Todos con Conteo) ---
export const getAllUsuariosService = async (req, res) => {
  try {
    const usuarios = await findAllUsuariosWithRecipeCount();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};