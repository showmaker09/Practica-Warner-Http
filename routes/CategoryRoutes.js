var express= require('express');
const {get, getById, create, update, destroy}  = require('../controllers/CategoryController');
const api = express.Router();

// estos son los endpoints seguidos de la ruta /api
api.get('/categorias', get);
api.get('/categorias/:id', getById);
api.post('/categorias', create);
api.put('/categorias/:id', update);
api.delete('/categorias/:id', destroy);

module.exports = api;