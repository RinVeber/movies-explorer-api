const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { CastError } = require('../utils/errors/CastError');
const { ConflictError } = require('../utils/errors/ConflictError');
const { errorMessages } = require('../utils/constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const createUser = (hash) => User.create({
    name,
    email,
    password: hash,
  });

  bcrypt
    .hash(password, 10)
    .then((hash) => createUser(hash))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError(errorMessages.correctData));
      }
      if (err.code === 11000) {
        return next(new ConflictError(errorMessages.errorUserEmail));
      }
      return next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(errorMessages.notFoundUser));
      }
      return res.send(...user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new NotFoundError(errorMessages.notFoundUser))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new CastError(errorMessages.updateUser);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-key-secret',
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch(next);
};
