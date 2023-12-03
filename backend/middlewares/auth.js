const jwt = require('jsonwebtoken');

const { SECRET_JWT_KEY } = require('../utils/constants');
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
    payload = jwt.verify(token, SECRET_JWT_KEY);
  } catch (err) {
    return next(new Error401('Токен недействителен'));
  }
  req.user = payload;
  next();
};

module.exports = middlewareAuth;
