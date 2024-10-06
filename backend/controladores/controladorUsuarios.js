const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Arreglo en memoria para almacenar usuarios
let usuarios = [];

// Login de usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const usuario = usuarios.find(user => user.email === email);
  if (!usuario) {
    return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRETO, {
    expiresIn: '30s'
  });

  res.status(200).json({ token, mensaje: 'Inicio de sesión exitoso' });
};

// Listar todos los usuarios
exports.listarUsuarios = (req, res) => {
  res.status(200).json(usuarios);
};

// Actualizar un usuario por ID
exports.actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  const usuario = usuarios.find(user => user.email === email);
  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  usuario.email = email;
  usuario.password = password ? bcrypt.hashSync(password, 10) : usuario.password;

  res.status(200).json({ mensaje: 'Usuario actualizado correctamente' });
};

// Eliminar un usuario por ID
exports.eliminarUsuario = (req, res) => {
  const { id } = req.params;

  usuarios = usuarios.filter(user => user.id !== id);
  res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
};
