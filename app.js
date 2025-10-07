const express = require('express');
const app = express();
const rutas= express.Router();
const port = 3000;
solicitudes = require('./productos');

app.listen(port, () => 
{
    console.log(`servidor corriendo en http://localhost:${port}`);
});

// Middleware para parsear el body de las solicitudes como JSON
app.use(express.json());

app.get('/', (req, res) => 
{
    res.send('Bienvenido a la tienda en línea');
});


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
