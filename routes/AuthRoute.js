var express = require('express');
/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints para registro e inicio de sesión de usuarios.
 *
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       required:
 *         - correo
 *         - contraseña
 *       properties:
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario para iniciar sesión.
 *         contraseña:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario.
 *       example:
 *         correo: "usuario@ejemplo.com"
 *         contraseña: "password123"
 *     RegisterCredentials:
 *       type: object
 *       required:
 *         - nombre
 *         - apellidos
 *         - nick
 *         - correo
 *         - contraseña
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del usuario.
 *         apellidos:
 *           type: string
 *           description: Apellidos del usuario.
 *         nick:
 *           type: string
 *           description: Alias del usuario.
 *         correo:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario.
 *         contraseña:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario (mínimo 8 caracteres).
 *       example:
 *         nombre: "Juan"
 *         apellidos: "Pérez"
 *         nick: "juanp"
 *         correo: "juan.perez@ejemplo.com"
 *         contraseña: "unaClaveSegura123"
 *     AuthToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token de autenticación JWT para ser usado en peticiones protegidas.
 *         message:
 *           type: string
 *           description: Mensaje de éxito.
 *       example:
 *         message: "Login con éxito"
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 */
const { login, register, } = require('../controllers/AuthController');
const { validatorLogin, validatorRegister } = require('../validators/AuthValidator');
const api = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario y retorna un token JWT.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       201:
 *         description: Login exitoso, retorna el token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       401:
 *         description: Credenciales incorrectas o usuario inactivo.
 *       422:
 *         description: Error de validación en los datos de entrada.
 */
api.post('/auth/login', validatorLogin, login);

/**
 * @swagger
 * /api/auth/registro:
 *   post:
 *     summary: Registra un nuevo usuario en el sistema.
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterCredentials'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       422:
 *         description: Error de validación (ej. correo ya existe, contraseña corta, etc.).
 *       500:
 *         description: Error interno del servidor.
 */
api.post('/auth/registro', validatorRegister, register)



module.exports = api;