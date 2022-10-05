const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { AuthError } = require('../utils/errors/AuthError');

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        minLength: 2,
        maxLength: 30,
        required: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        dropDups: true,
        validate: {
          validator: (link) => isEmail(link),
          message: 'Неправильный формат почты',
        },
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
    },
  );
  userSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new AuthError('Неправильные почта или пароль'));
        }
  
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new AuthError('Неправильные почта или пароль'));
            }
  
            return user;
          });
      });
  };

  module.exports = mongoose.model('User', userSchema);