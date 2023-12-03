/* eslint-disable consistent-return */
const Card = require('../models/card');
const {
  STATUS_OK,
} = require('../utils/constants');

const Error404 = require('../errors/Error404');
const Error403 = require('../errors/Error403');

// возвращает все карточки
module.exports.findAllCards = (req, res, next) => {
  Card.find([{}])
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ cards }))
    .catch(next);
};

// создает карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new Error404('Карточка не создана');
      }
      res.status(STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

// удаляет карточку по id
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new Error404('Такая карточка не существует.');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new Error403('Удалять карточки может только владелец');
      }

      return Card.deleteOne(card)
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch((err) => {
      next(err);
    });
};

// ставит лайк карточке
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new Error404('Карточка не найдена.');
      }
      res.send({ card });
    })
    .catch((err) => {
      next(err);
    });
};

// убирает лайк с карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new Error404('Карточка не найдена.');
      }
      return res.send({ card });
    })
    .catch((err) => {
      next(err);
    });
};
