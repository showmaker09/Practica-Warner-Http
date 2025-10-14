const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Warner API',
      version: '1.0.0',
      description:
        'Una API RESTful para gestionar noticias, categorías, perfiles, usuarios y estados.',
      contact: {
        name: 'Tu Nombre',
        email: 'tu.email@example.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desarrollo',
      },
    ],
  },
  // Rutas a los archivos que contienen las anotaciones de la API
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;