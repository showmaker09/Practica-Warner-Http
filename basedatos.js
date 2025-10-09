// Importar Sequelize
const { Sequelize } = require('sequelize');

// Crear una instancia con los datos de tu conexión
const sequelize = new Sequelize('octavio', 'root', '', 
{
    host: 'localhost',
    dialect: 'mysql',
    port: 3307 // ¡Importante! Usa el puerto que configuraste
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