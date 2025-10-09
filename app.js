// 1. IMPORTACIONES
const sequelize = require('./basedatos');
const app = require('./conexion'); // Importamos la app de Express

// Importamos los modelos.
// NOTA: Aunque el linter pueda decir que estas variables no se usan,
// el simple hecho de importarlas (ejecutar el 'require') es crucial.
// Al ejecutarse cada archivo de modelo, éste se "registra" a sí mismo
// en la instancia de Sequelize, preparándolo para la sincronización.
const { Profile } = require('./models/ProfileModel');
const { User } = require('./models/UserModel');
const { Category } = require('./models/CategoryModel');
const { State } = require('./models/StateModel');
const { New } = require('./models/NewModel');

// 2. FUNCIÓN PRINCIPAL ASÍNCRONA
async function main() {
    try {
        // Probar la conexión a la base de datos
        await sequelize.authenticate();
        console.log('✅ Conexión establecida correctamente.');

        // Sincronizar todos los modelos con la base de datos.
        // Esto crea las tablas si no existen.
        // {force: true} borraría y recrearía las tablas, útil en desarrollo.
        await sequelize.sync({ force: false });
        console.log('🔄 Modelos sincronizados con la base de datos.');

        // Aquí puedes empezar a definir las rutas de tu API
        app.get('/test', (req, res) => {
            res.json({ message: 'La API y la base de datos funcionan!' });
        });

        // --- EJEMPLO: RUTA PARA CREAR UN PERFIL ---
        // Esta ruta escucha peticiones POST en http://localhost:3000/api/profiles
        app.post('/api/profiles', async (req, res) => {
            try {
                // 1. Obtenemos el 'nombre' del cuerpo de la petición.
                const { nombre } = req.body;

                // 2. Usamos el modelo 'Profile' para crear una nueva fila en la tabla 'profiles'.
                const nuevoPerfil = await Profile.create({ nombre });

                // 3. Respondemos con el perfil recién creado y un estado 201 (Creado).
                res.status(201).json(nuevoPerfil);
            } catch (error) {
                res.status(500).json({ error: 'Error al crear el perfil', details: error.message });
            }
        });
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
    }
}

// 3. EJECUCIÓN
main();