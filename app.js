const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const rutas= express.Router();
const port = 3000;
solicitudes = require('./productos');

// --- Configuración de Swagger ---
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Tienda de Productos',
            version: '1.0.0',
            description: 'Una API simple para gestionar productos, creada con Express.',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Servidor de Desarrollo'
            },
        ],
    },
    // Archivos que contienen las anotaciones para generar la documentación
    apis: ['./app.js'],
};

const specs = swaggerJsdoc(options);

app.listen(port, () => 
{
    console.log(`servidor corriendo en http://localhost:${port}`);
});

app.use(express.json());

app.get('/', (req, res) => 
{
    res.send('Bienvenido a la tienda en línea');
});

// Servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para la gestión de productos
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtiene la lista completa de productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Producto'
 */
app.get('/productos', (req, res) => 
{
    res.json(solicitudes.productos);
});
app.get('/productos/categoria/:categoria', (req, res) => 
{
    const categoria = req.params.categoria;
    const productosFiltrados = solicitudes.productos.filter(p => p.categoria === categoria);

    if (productosFiltrados.length > 0) {
        res.json(productosFiltrados);
    } else {
        res.status(404).json({ error: `No se encontraron productos en la categoría '${categoria}'` });
    }
});

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del producto
 *     responses:
 *       200:
 *         description: Datos del producto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado.
 */
app.get('/productos/:id', (req, res) => 
{
    const id = parseInt(req.params.id);
    const producto = solicitudes.productos.find(p => p.id === id);
    if (producto) 
    {
        res.json(producto);
    }
     else 
    {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});
 
/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - nombre
 *         - precio
 *         - stock
 *         - activo
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID autogenerado del producto.
 *         nombre:
 *           type: string
 *           description: El nombre del producto.
 *         precio:
 *           type: number
 *           format: float
 *           description: El precio del producto.
 *         categoria:
 *           type: string
 *           description: La categoría del producto (opcional).
 *         stock:
 *           type: integer
 *           description: La cantidad disponible en stock.
 *         activo:
 *           type: boolean
 *           description: Indica si el producto está activo.
 *       example:
 *         id: 1
 *         nombre: "Producto 1"
 *         precio: 100
 *         categoria: "precio-minimo"
 *         stock: 200
 *         activo: true
 */

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *       400:
 *         description: Datos de entrada inválidos.
 */
app.post('/productos', (req, res) => 
{
    const { nombre, precio, categoria, stock, activo } = req.body;

    // --- Validación de datos ---
    if (typeof nombre !== 'string' || nombre.trim() === '') 
    {
        return res.status(400).json({ error: 'El campo "nombre" es inválido o está vacío.' });
    }
    if (typeof precio !== 'number' || precio < 0) {
        return res.status(400).json({ error: 'El campo "precio" debe ser un número mayor o igual a 0.' });
    }
    if (typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({ error: 'El campo "stock" debe ser un número mayor o igual a 0.' });
    }
    if (typeof activo !== 'boolean') 
    {
        return res.status(400).json({ error: 'El campo "activo" debe ser un valor booleano (true o false).' });
    }

    // --- Creación del nuevo producto ---
    const nuevoId = solicitudes.productos.length > 0 ? Math.max(...solicitudes.productos.map(p => p.id)) + 1 : 1;
    const nuevoProducto = 
    {
        id: nuevoId,
        nombre,
        precio,
        categoria: categoria || "general", // Categoria opcional
        stock,
        activo
    };

    solicitudes.productos.push(nuevoProducto);

    res.status(201).location(`/productos/${nuevoId}`).json(nuevoProducto);
});

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualiza un producto existente por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Producto'
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *       404:
 *         description: Producto no encontrado.
 */
app.put ('/productos/:id', (req, res) =>
{
    const id = parseInt(req.params.id);
    const productoIndex = solicitudes.productos.findIndex(p => p.id === id);  
   
   
    if (productoIndex === -1) 
    {
        return res.status(404).json({ error: 'Producto no encontrado' });
    } 

    const { nombre, precio, categoria, stock, activo } = req.body;

    // --- Validación de datos ---
    if (typeof nombre !== 'string' || nombre.trim() === '') 
    {
        return res.status(400).json({ error: 'El campo "nombre" es inválido o está vacío.' });
    }
    if (typeof precio !== 'number' || precio < 0) 
    {
        return res.status(400).json({ error: 'El campo "precio" debe ser un número mayor o igual a 0.' });
    }
    if (typeof stock !== 'number' || stock < 0)

    {
        return res.status(400).json({ error: 'El campo "stock" debe ser un número mayor o igual a 0.' });
    }
    if (typeof activo !== 'boolean') 
    {
        return res.status(400).json({ error: 'El campo "activo" debe ser un valor booleano (true o false).' });
    }

    // --- Actualización del producto ---
    const productoActualizado = {
        id,
        nombre,
        precio,
        categoria: categoria || "general",
        stock,
        activo
    };

    solicitudes.productos[productoIndex] = productoActualizado;

    res.json(productoActualizado);
});

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del producto a eliminar
 *     responses:
 *       204:
 *         description: Producto eliminado exitosamente (sin contenido).
 *       404:
 *         description: Producto no encontrado.
 */
app.delete('/productos/:id', (req, res) => 
{
    const id = parseInt(req.params.id);
    const productoIndex = solicitudes.productos.findIndex(p => p.id === id);

    if (productoIndex === -1) 
    {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    solicitudes.productos.splice(productoIndex, 1);

    res.status(204).send();
});

/**
 * @swagger
 * /productos/{id}/stock:
 *   patch:
 *     summary: Actualiza el stock de un producto específico
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: integer
 *                 description: La nueva cantidad de stock.
 *             example:
 *               stock: 150
 *     responses:
 *       200:
 *         description: Stock actualizado.
 *       404:
 *         description: Producto no encontrado.
 */
app.patch ('/productos/:id/stock', (req, res) =>
{
    const id = parseInt(req.params.id);
    const producto = solicitudes.productos.find(p => p.id === id);

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { stock } = req.body;

    // Validación de datos
    if (typeof stock !== 'number' || stock < 0) {
        return res.status(400).json({ error: 'El campo "stock" debe ser un número mayor o igual a 0.' });
    }

    // Actualización del stock
    producto.stock = stock;

    res.json(producto);
});
