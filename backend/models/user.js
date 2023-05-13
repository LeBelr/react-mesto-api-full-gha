const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const httpRegEx = require('../utils/regEx');
const UnauthorizedError = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return httpRegEx.test(link);
      },
      message: 'Некорректный URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Введите корректные данные',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неверные данные почты или пароля'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неверные данные почты или пароля'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
