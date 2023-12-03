/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* const { SECRET_JWT_KEY } = process.env; */
const Error404 = require('../errors/Error404');
const Error400 = require('../errors/Error400');
const Error401 = require('../errors/Error401');
const Error409 = require('../errors/Error409');

const User = require('../models/user');
const {
  STATUS_OK,
  SECRET_JWT_KEY,
} = require('../utils/constants');

const options = {
  new: true, // обработчик then получит на вход обновлённую запись
  runValidators: true, // данные будут валидированы перед изменением
  upsert: true,
};

// функция создания пользователья
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 6)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;
      res.status(STATUS_OK).send({
        _id,
        email,
        name,
        about,
        avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Error400('Переданы некорректные данные при создании пользователя'));
      }
      if (err.code === 11000) {
        return next(new Error409('Пользователь с таким электронным адресом уже зарегистрирован'));
      }
      next(err);
    });
};

// функция, возвращающая всех пользователей
module.exports.findAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

// возвращает ин6формацию о текущем пользователе
module.exports.getAboutMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new Error404('Пользователь не авторизирован.');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Error401(`${err} Юзер не найден`));
      }
      next(err);
    });
};

// функция, возвращающая пользователя по _id
module.exports.findUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) return res.send({ user });
      throw new Error404('Неверно указан id адрес');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Error400('Переданы некорректные данные поиска пользователя.'));
      }
      next(err);
    });
};

// функция обновления профиля
module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, options)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Error400('Переданы некорректные данные для обновления профиля пользователя.'));
      }
      next(err);
    });
};

// функция обновления аватара
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, options)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Error400('Переданы некорректные данные для обновления аватара.'));
      }
      next(err);
    });
};

// функция авторизации
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неверная почта или пароль'));
      }
      const token = jwt.sign({ _id: user._id }, SECRET_JWT_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      // возвращаем ошибку аутентификации
      next(new Error401(err.message));
    });
};
