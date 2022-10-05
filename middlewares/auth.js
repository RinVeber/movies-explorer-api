const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/errors/AuthError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Требуется авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key-secret');
  } catch (err) {
    throw new AuthError('Требуется авторизация');
  }
  req.user = payload;
  return next();
};
