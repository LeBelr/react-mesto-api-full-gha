const { incorrectDataError, RegError } = require('../errors/errors');

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(incorrectDataError).send({ message: 'Переданы некорректные данные при создании' });
    return;
  }
  if (err.name === 'CastError') {
    res.status(incorrectDataError).send({ message: 'Передан некорректный id' });
    return;
  }
  if (err.code === 11000) {
    res.status(RegError).send({ message: 'Пользователь с данной почтой существует' });
    return;
  }

  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
};
