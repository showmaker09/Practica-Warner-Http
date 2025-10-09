// Importar Sequelize
const { Sequelize } = require('sequelize');

// Crear una instancia con los datos de tu conexión
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nombre de la base de datos
    process.env.DB_USER,      // Usuario
    process.env.DB_PASSWORD,  // Contraseña
{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT // Puerto de la base de datos
});
sequelize.authenticate()
    .then(() => {
        console.log('Se ha establecido conexión con la base de datos')
    })
    .catch(err => {
        console.log('No se pudo establecer conexión con la base de datos:', err)
    })
// Exportar la conexión para usarla en otros archivos
module.exports = sequelize;