const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_VALID } = require('../utils/constants');
const {
  findAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

// получение всех карточек
router.get('/cards', findAllCards);

// создание карточки
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(URL_VALID),
  }),
}), createCard);

// удаление карточки
router.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), deleteCard);

// постановка лайка карточке
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);

// удаление лайка с карточки
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
