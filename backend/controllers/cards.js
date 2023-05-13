const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

function getAllCards(req, res, next) {
  Card.find({}).populate('owner')
    .then((allCards) => {
      res.send(allCards);
    })
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий id карточки');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалять чужие карточки');
      }
      return Card.deleteOne(card)
        .then(() => {
          res.send({ message: `Карточка ${card._id} удалена` });
        });
    })
    .catch(next);
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий id карточки');
      }
      res.send(card);
    })
    .catch(next);
}

function unlikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий id карточки');
      }
      res.send(card);
    })
    .catch(next);
}

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
