import express from 'express';
import cors from 'cors';
import recetasRoutes from './routes/recetas.routes.js';

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/recetas', recetasRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
