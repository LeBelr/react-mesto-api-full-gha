const cardsRouter = require('express').Router();
const {
  getAllCards, createCard, deleteCard, likeCard, unlikeCard,
} = require('../controllers/cards');
const { validateCreateCard, validateCardId } = require('../middlewares/validate');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', validateCreateCard, createCard);
cardsRouter.delete('/:cardId', validateCardId, deleteCard);
cardsRouter.put('/:cardId/likes', validateCardId, likeCard);
cardsRouter.delete('/:cardId/likes', validateCardId, unlikeCard);

module.exports = cardsRouter;
