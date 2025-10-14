var express = require('express');
const { body } = require('express-validator');

const {get, getById, create, update, destroy}  = require('../controllers/StateController');
const api = express.Router();

// Reglas de validación para crear y actualizar un Estado
const stateValidationRules = [
  // El nombre no debe estar vacío
  body('nombre').notEmpty().withMessage('El campo nombre es obligatorio.'),
  // La abreviación debe tener exactamente 2 caracteres
  body('abreviacion').isLength({ min: 2, max: 2 }).withMessage('La abreviación debe tener exactamente 2 caracteres.')
];

// estos son los endpoints seguidos de la ruta /api
api.get('/estados', get);
api.get('/estados/:id', getById);
// Se aplican las reglas de validación como middleware antes de llamar al controlador
api.post('/estados', stateValidationRules, create);
api.put('/estados/:id', stateValidationRules, update);
api.delete('/estados/:id', destroy);

module.exports = api;
