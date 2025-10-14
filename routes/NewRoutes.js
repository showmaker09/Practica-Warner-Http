var express = require('express');

const {get, getById, create, update, destroy}  = require('../controllers/NewController');
const api = express.Router();

// estos son los endpoints seguidos de la ruta /api
api.get('/nuevas', get);
api.get('/nuevas/:id', getById);
api.post('/nuevas', create);
api.put('/nuevas/:id', update);
api.delete('/nuevas/:id', destroy);

module.exports = api;