import { getRecetasModel, createRecetaModel } from '../models/recetas.model.js';


import {
 
  findRecetaById,
  findIngredientesByRecetaId,
  findPasosByRecetaId,
  updateRecetaModel
} from '../models/recetas.model.js';

// Servicio para obtener todas las recetas
export const getRecetasService = async () => {
  const recetas = await getRecetasModel();
  return recetas;
};

// Servicio para crear una nueva receta 
export const createRecetaService = async (newReceta) => {
  const recetaId = await createRecetaModel(newReceta);
  return { id: recetaId, ...newReceta };
};

// por ID
export const getRecetaByIdService = async (id) => {
  // 1. Busca la receta, los ingredientes y los pasos al mismo tiempo
  const [receta, ingredientes, pasos] = await Promise.all([
    findRecetaById(id),
    findIngredientesByRecetaId(id),
    findPasosByRecetaId(id)
  ]);

  // 2. Verifica si la receta existe
  if (!receta) {
    return null; // Devuelve null si no se encuentra
  }

  // 3. Combina todo en un solo objeto y lo devuelve
  return {
    ...receta,
    ingredientes: ingredientes,
    pasos: pasos
  };
};


 // --- NUEVA FUNCIÓN DE SERVICIO PUT (Actualizar) ---
export const updateRecetaService = async (req, res) => {
  try {
    const { id } = req.params; // ID de la receta a actualizar
    const datosParaActualizar = req.body; // Datos (ej. { nombre, descripcion })

    // --- Lógica de Permiso (¡IMPORTANTE!) ---
    // En una app real, el ID del usuario vendría de un token (login)


      //IMPORTANTE!!!!!!
    // Por ahora, simularemos que el usuario "Ana" (ID 1) está logueado.
    const id_usuario_autenticado = 1; 

    // 1. Buscamos la receta para saber quién es el dueño
    const receta = await findRecetaById(id);
    if (!receta) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    // 2. Comparamos el dueño de la receta con el usuario logueado
    if (receta.id_usuario !== id_usuario_autenticado) {
      return res.status(403).json({ message: 'Error: No tienes permiso para editar esta receta' });
    }
    // --- Fin de la lógica de permiso ---


    // 3. Si tiene permiso, actualiza el modelo
    const affectedRows = await updateRecetaModel(id, datosParaActualizar);

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Receta no encontrada o datos iguales' });
    }

    res.json({ message: 'Receta actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



