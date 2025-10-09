const express = require('express')
const app = express();
const PORT = process.env.APP_PORT || 3000; // Usa el puerto del .env o 3000 como fallback

app.use(express.json());

app.listen(PORT, () => {
    console.log( `Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app;