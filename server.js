
const express = require('express');
require('dotenv').config()
const app = express();

// Middleware para analizar JSON
app.use(express.json());

// Importar las rutas
const rutas = require('./routes');

// Definición de rutas
app.use('/api/v1', rutas);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
