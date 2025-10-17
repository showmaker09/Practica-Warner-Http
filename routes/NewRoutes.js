var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/NewController');
const {validatorNewCreate, validatorNewUpdate} = require('../validators/NewValidator');
const { authenticateAdmin, authenticateAny } = require('../middlewares/jwt')

const api = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Noticia:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado de la noticia.
 *         titulo:
 *           type: string
 *           description: El título de la noticia.
 *         descripcion:
 *           type: string
 *           description: El contenido de la noticia.
 *         imagen:
 *           type: string
 *           description: La imagen de la noticia en formato Base64.
 *         categoria_id:
 *           type: integer
 *           description: El ID de la categoría a la que pertenece la noticia.
 *         usuario_id:
 *           type: integer
 *           description: El ID del usuario que creó la noticia.
 *         estado_id:
 *           type: integer
 *           description: El ID del estado de la noticia.
 *         activo:
 *           type: boolean
 *           description: Indica si la noticia está activa o no.
 *       example:
 *         id: 1
 *         titulo: 'Gran Descubrimiento Científico'
 *         descripcion: 'Científicos anuncian un avance que podría cambiar el mundo.'
 *         imagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
 *         categoria_id: 1
 *         usuario_id: 1
 *         estado_id: 1
 *         activo: true
 *     NoticiaCrear:
 *       type: object
 *       required:
 *         - titulo
 *         - descripcion
 *         - imagen
 *         - categoria_id
 *         - usuario_id
 *         - estado_id
 *       properties:
 *         titulo:
 *           type: string
 *           minLength: 2
 *         descripcion:
 *           type: string
 *           minLength: 2
 *         imagen:
 *           type: string
 *           format: byte
 *           description: Imagen en formato Base64.
 *         categoria_id:
 *           type: integer
 *         usuario_id:
 *           type: integer
 *         estado_id:
 *           type: integer
 *         activo:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Noticias
 *   description: API para la gestión de noticias
 */

// estos son los endpoints seguidos de la ruta /api

/**
 * @swagger
 * /api/nuevas:
 *   get:
 *     summary: Retorna una lista de todas las noticias
 *     tags: [Noticias]
 *     responses:
 *       200:
 *         description: La lista de noticias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Noticia'
 */
api.get('/nuevas', get);

/**
 * @swagger
 * /api/nuevas/{id}:
 *   get:
 *     summary: Obtiene una noticia por su ID
 *     tags: [Noticias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la noticia
 *     responses:
 *       200:
 *         description: La noticia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Noticia'
 *       404:
 *         description: La noticia no fue encontrada
 */
api.get('/nuevas/:id', getById);

/**
 * @swagger
 * /api/nuevas:
 *   post:
 *     summary: Crea una nueva noticia
 *     tags: [Noticias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoticiaCrear'
 *     responses:
 *       201:
 *         description: La noticia fue creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Noticia'
 *       422:
 *         description: Error de validación en los datos de entrada
 */
api.post('/nuevas',  authenticateAny,validatorNewCreate,create);

/**
 * @swagger
 * /api/nuevas/{id}:
 *   put:
 *     summary: Actualiza una noticia existente
 *     tags: [Noticias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la noticia a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoticiaCrear'
 *     responses:
 *       200:
 *         description: Noticia actualizada exitosamente.
 *       404:
 *         description: La noticia no fue encontrada.
 *       422:
 *         description: Error de validación.
 */
api.put('/nuevas/:id', authenticateAny,validatorNewUpdate, update);

/**
 * @swagger
 * /api/nuevas/{id}:
 *   delete:
 *     summary: Elimina una noticia por su ID
 *     tags: [Noticias]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la noticia a eliminar
 *     responses:
 *       200:
 *         description: Noticia eliminada exitosamente.
 *       404:
 *         description: La noticia no fue encontrada.
 */
api.delete('/nuevas/:id',  authenticateAny,destroy);

module.exports = api;