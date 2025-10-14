// 1. IMPORTACIONES
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const express = require('express')
const app = express();
const PORT = 3000

app.use(express.json());

//Exportar Rutas
const profile_routes = require('./routes/profileRoutes');
const category_routes = require('./routes/categoryRoutes');
const new_routes = require('./routes/newRoutes');
const state_routes = require('./routes/stateRoutes');


//Usar las rutas

app.use('/api', profile_routes)
app.use('/api', category_routes);
app.use('/api', new_routes);
app.use('/api', state_routes);

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
});
app.listen(PORT, () => {
    console.log( `Servidor escuchando en http://localhost:${PORT}`);
});
module.exports = app;