const validator = require('validator');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const { errorMessages } = require('../utils/constants');

const urlValidation = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError(errorMessages.errorValid);
  }
  return value;
};

const validateId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidation),
    trailerLink: Joi.string().required().custom(urlValidation),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(urlValidation),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validateLogin,
  validateId,
  validateCreateUser,
  validateUpdateUser,
  validateMovie,
};
