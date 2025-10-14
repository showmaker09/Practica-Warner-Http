var express = require('express');
const { body } = require('express-validator');

const { get, getById, create, update, destroy } = require('../controllers/UserController');
const api = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado del usuario.
 *         nick:
 *           type: string
 *           description: El alias único del usuario.
 *         nombre:
 *           type: string
 *           description: El nombre del usuario.
 *         apellidos:
 *           type: string
 *           description: Los apellidos del usuario.
 *         email:
 *           type: string
 *           format: email
 *           description: El correo electrónico del usuario.
 *         perfil_id:
 *           type: integer
 *           description: El ID del perfil asociado al usuario.
 *     UsuarioCrear:
 *       type: object
 *       required:
 *         - nick
 *         - nombre
 *         - email
 *         - password
 *         - perfil_id
 *       properties:
 *         nick:
 *           type: string
 *         nombre:
 *           type: string
 *         apellidos:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *           description: La contraseña debe tener al menos 6 caracteres.
 *         perfil_id:
 *           type: integer
 */

const userValidationRules = [
    body('nick').notEmpty().withMessage('El nick es obligatorio.'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio.'),
    body('email').isEmail().withMessage('Debe proporcionar un email válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
    body('perfil_id').isInt().withMessage('El perfil_id debe ser un número entero.')
];

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: API para la gestión de usuarios
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Retorna una lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: La lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
api.get('/usuarios', get);

api.get('/usuarios/:id', getById)

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCrear'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       422:
 *         description: Error de validación.
 */
api.post('/usuarios', userValidationRules, create)

api.put('/usuarios/:id', userValidationRules, update)
api.delete('/usuarios/:id', destroy)


module.exports = api;