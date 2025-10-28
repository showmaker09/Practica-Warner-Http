import { getRecetasModel, createRecetaModel } from '../models/recetas.model.js';

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
