import { Router } from 'express';
import { getRecetasService, createRecetaService,getRecetaByIdService,updateRecetaService } from '../services/recetas.service.js';

const router = Router();

// Ruta para obtener todas las recetas
router.get('/', async (req, res) => {
  try {
    const recetas = await getRecetasService();
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las recetas' });
  }
});

// Ruta para crear una nueva receta
router.post('/', async (req, res) => {
  try {
    const newReceta = await createRecetaService(req.body);
    res.status(201).json(newReceta);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la receta' });
  }
});

router.put('/:id', updateRecetaService);

// implementa un get para buscar id
router.get('/:id', async (req, res) => {
    try {
        const receta = await getRecetaByIdService(req.params.id);
        if (receta) {
            res.json(receta);
        } else {
            res.status(404).json({ message: 'Receta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la receta' });
    }
});


export default router;
