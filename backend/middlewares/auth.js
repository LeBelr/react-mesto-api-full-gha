const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }

  req.user = payload;

  next();
}

module.exports = auth;
