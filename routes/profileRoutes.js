var express = require('express');
const { body } = require('express-validator');

const {get, getById, create, update, destroy}  = require('../controllers/ProfileController');
const { authenticateAdmin } = require('../middlewares/jwt')

const api = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Perfil:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado del perfil.
 *         nombre:
 *           type: string
 *           description: El nombre del perfil (ej. Administrador, Editor).
 *       example:
 *         id: 1
 *         nombre: 'Administrador'
 */

const profileValidationRules = [
  body('nombre').notEmpty().withMessage('El campo nombre es obligatorio.')
];

/**
 * @swagger
 * tags:
 *   name: Perfiles
 *   description: API para la gestión de perfiles de usuario
 */

/**
 * @swagger
 * /api/perfiles:
 *   get:
 *     summary: Retorna una lista de todos los perfiles
 *     tags: [Perfiles]
 *     responses:
 *       200:
 *         description: La lista de perfiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Perfil'
 */
api.get('/perfiles', get);

/**
 * @swagger
 * /api/perfiles/{id}:
 *   get:
 *     summary: Obtiene un perfil por su ID
 *     tags: [Perfiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del perfil
 *     responses:
 *       200:
 *         description: El perfil encontrado
 *       404:
 *         description: El perfil no fue encontrado
 */
api.get('/perfiles/:id', getById)

/**
 * @swagger
 * /api/perfiles:
 *   post:
 *     summary: Crea un nuevo perfil
 *     tags: [Perfiles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Perfil'
 *     responses:
 *       201:
 *         description: Perfil creado exitosamente.
 *       422:
 *         description: Error de validación.
 */
api.post('/perfiles', authenticateAdmin ,profileValidationRules, create)

/**
 * @swagger
 * /api/perfiles/{id}:
 *   put:
 *     summary: Actualiza un perfil existente
 *     tags: [Perfiles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del perfil a actualizar
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente.
 *       404:
 *         description: El perfil no fue encontrado.
 */
api.put('/perfiles/:id',authenticateAdmin , profileValidationRules, update)

api.delete('/perfiles/:id',authenticateAdmin , destroy)


module.exports = api;