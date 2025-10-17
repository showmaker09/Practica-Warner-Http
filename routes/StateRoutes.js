var express = require('express');
const { body } = require('express-validator');
const { validatorStateRequire, validatorStateOptional } = require('../validators/StateValidator');

const {get, getById, create, update, destroy}  = require('../controllers/StateController');
const api = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Estado:
 *       type: object
 *       required:
 *         - nombre
 *         - abreviacion
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado del estado.
 *         nombre:
 *           type: string
 *           description: El nombre completo del estado.
 *         abreviacion:
 *           type: string
 *           description: La abreviación de 2 caracteres del estado.
 *           example: "CA"
 *       example:
 *         id: 1
 *         nombre: 'California'
 *         abreviacion: 'CA'
 */

// Reglas de validación para crear y actualizar un Estado
const stateValidationRules = 
[
  // El nombre no debe estar vacío
  body('nombre').notEmpty().withMessage('El campo nombre es obligatorio.'),
  // La abreviación debe tener exactamente 2 caracteres
  body('abreviacion').isLength({ min: 2, max: 2 }).withMessage('La abreviación debe tener exactamente 2 caracteres.')
];

/**
 * @swagger
 * tags:
 *   name: Estados
 *   description: API para la gestión de estados
 */

/**
 * @swagger
 * /api/estados:
 *   get:
 *     summary: Retorna una lista de todos los estados
 *     tags: [Estados]
 *     responses:
 *       200:
 *         description: La lista de estados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estado'
 */
api.get('/estados', get);

/**
 * @swagger
 * /api/estados/{id}:
 *   get:
 *     summary: Obtiene un estado por su ID
 *     tags: [Estados]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del estado
 *     responses:
 *       200:
 *         description: El estado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estado'
 *       404:
 *         description: El estado no fue encontrado
 */
api.get('/estados/:id', getById);

/**
 * @swagger
 * /api/estados:
 *   post:
 *     summary: Crea un nuevo estado
 *     tags: [Estados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estado'
 *     responses:
 *       201:
 *         description: El estado fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estado'
 *       422:
 *         description: Error de validación en los datos de entrada
 *       500:
 *         description: Error en el servidor
 */
api.post('/estados', validatorStateRequire, validatorStateOptional, stateValidationRules,create);

// La documentación para PUT y DELETE seguiría un patrón similar...
api.put('/estados/:id', validatorStateRequire, validatorStateOptional,stateValidationRules,update);
api.delete('/estados/:id', destroy);

module.exports = api;
