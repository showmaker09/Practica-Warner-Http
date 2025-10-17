var express= require('express');
const {get, getById, create, update, destroy}  = require('../controllers/CategoryController');
const { validatorCategoryCreate, validatorCategoryUpdate} = require('../validators/CategoryValidator');
const { authenticateAdmin } = require('../middlewares/jwt')


const api = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado de la categoría.
 *         nombre:
 *           type: string
 *           description: El nombre de la categoría.
 *         descripcion:
 *           type: string
 *           description: Una breve descripción de la categoría.
 *         activo:
 *           type: boolean
 *           description: Indica si la categoría está activa.
 *       example:
 *         id: 1
 *         nombre: 'Deportes'
 *         descripcion: 'Noticias relacionadas con el mundo del deporte.'
 *         activo: true
 */

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: API para la gestión de categorías de noticias
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Retorna una lista de todas las categorías
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: La lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 */
api.get('/categorias', get);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtiene una categoría por su ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la categoría
 *     responses:
 *       200:
 *         description: La categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: La categoría no fue encontrada
 */
api.get('/categorias/:id', getById);

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente.
 *       403:
 *         description: Acceso denegado. Se requiere rol de Administrador.
 *       422:
 *         description: Error de validación.
 */
api.post('/categorias',authenticateAdmin, validatorCategoryCreate,create);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualiza una categoría existente
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente.
 *       404:
 *         description: La categoría no fue encontrada.
 */
api.put('/categorias/:id', authenticateAdmin,validatorCategoryUpdate,update);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Elimina una categoría por su ID
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente.
 *       404:
 *         description: La categoría no fue encontrada.
 */
api.delete('/categorias/:id',authenticateAdmin, destroy);



module.exports = api;