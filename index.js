// Archivo: index.js

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import juegoRoutes from './src/routes/juegoRoutes.js';
import usuarioRoutes from './src/routes/usuarioRoutes.js';
// --- Configuración Inicial ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Middlewares ---
app.use(express.json()); // Para entender JSON
app.use(express.urlencoded({ extended: true })); // Para entender datos de formularios
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// --- Configuración del Motor de Plantillas (EJS) ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// --- Rutas ---
app.get('/', (req, res) => {
  res.redirect('/admin/juegos'); // Redirigir la raíz al panel de admin
});

// Usar las rutas para la gestión de juegos bajo el prefijo /admin/juegos
app.use('/admin/juegos', juegoRoutes);
app.use('/admin/usuarios', usuarioRoutes); // Rutas para usuarios

// --- Iniciar Servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});