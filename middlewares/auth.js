const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/errors/AuthError');
const { errorMessages } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(errorMessages.auth);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key-secret');
  } catch (err) {
    throw new AuthError(errorMessages.auth);
  }
  req.user = payload;
  return next();
};
