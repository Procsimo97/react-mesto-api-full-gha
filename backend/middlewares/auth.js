const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const Error401 = require('../errors/Error401');

// eslint-disable-next-line consistent-return
const middlewareAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Error401('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Error401('Токен недействителен'));
  }
  req.user = payload;
  next();
};

module.exports = middlewareAuth;
