const express = require('express');
const { login, listarUsuarios, actualizarUsuario, eliminarUsuario } = require('../controladores/controladorUsuarios');
const middlewareAuth = require('../middlewares/middlewareAuth');
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', login);

// Rutas protegidas
router.get('/usuarios', middlewareAuth, listarUsuarios);
router.put('/usuarios/:id', middlewareAuth, actualizarUsuario);
router.delete('/usuarios/:id', middlewareAuth, eliminarUsuario);

module.exports = router;
