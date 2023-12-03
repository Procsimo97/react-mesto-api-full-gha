const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_VALID } = require('../utils/constants');

const {
  findUserById,
  findAllUsers,
  updateUserProfile,
  updateUserAvatar,
  getAboutMe,
} = require('../controllers/users');

// получение информации о текущем пользователе
router.get('/users/me', getAboutMe);
// поиск пользователя по id
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), findUserById);

// поиск всех созданных пользователей
router.get('/users', findAllUsers);

// обновление данных пользователя
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserProfile);

// обновление аватара пользователя
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_VALID),
  }),
}), updateUserAvatar);

module.exports = router;
