import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Cargar variables de entorno
import recetasRoutes from './routes/recetas.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';


const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/recetas', recetasRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Iniciar el servidor  

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
