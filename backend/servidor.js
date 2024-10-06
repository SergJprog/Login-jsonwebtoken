require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rutasUsuarios = require('./rutas/rutasUsuarios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', rutasUsuarios);

// Iniciar el servidor
const PUERTO = process.env.PUERTO || 5000;
app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});
