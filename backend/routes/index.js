const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateLogin, validateCreateUser } = require('../middlewares/validate');

function notFound(req, res) {
  res.status(404).send({ message: 'Ошибка 404 - Страница не найдена' });
}

router.use('/users', auth, usersRouter);
router.use('/cards', auth, cardsRouter);
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use('/*', notFound);

module.exports = router;
