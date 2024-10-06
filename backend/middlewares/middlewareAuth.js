const jwt = require('jsonwebtoken');

const middlewareAuth = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado' });
  }

  try {
    const verificado = jwt.verify(token.split(' ')[1], process.env.JWT_SECRETO);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token no válido' });
  }
};

module.exports = middlewareAuth;
