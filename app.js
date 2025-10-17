// 1. IMPORTACIONES
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3000;

// Importaciones de Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');

// Middlewares
app.use(express.json());
app.use(cors());


//Exportar Rutas si ves que estan en rojo espera un momento a que se guarden los cambios
const profile_routes = require('./routes/profileRoutes');
const category_routes = require('./routes/categoryRoutes');
const new_routes = require('./routes/newRoutes');
const state_routes = require('./routes/stateRoutes');
const user_routes = require('./routes/userRoutes');
const auth_routes = require('./routes/AuthRoute');



// Usar las rutas de la API
app.use('/api', profile_routes);
app.use('/api', category_routes);
app.use('/api', new_routes);
app.use('/api', state_routes);
app.use('/api', user_routes);
app.use('/api', auth_routes);

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT, () => {
    console.log( `Servidor escuchando en http://localhost:${PORT}`);
    console.log( `Documentación de API disponible en http://localhost:${PORT}/api-docs`);
});
module.exports = app;