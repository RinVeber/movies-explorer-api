const Movie = require('../models/movie');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { CastError } = require('../utils/errors/CastError');
const { ConflictError } = require('../utils/errors/ConflictError');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { errorMessages } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new CastError(errorMessages.createMovie);
      } else if (err.code === 11000) {
        throw new ConflictError(errorMessages.createConflictMovie);
      }
    })
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;
  Movie.findById(movieId)
    .orFail(new NotFoundError(errorMessages.notFoundMovie))
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        Movie.findByIdAndDelete(movieId)
          .then(() => res.status(200).send({ message: errorMessages.removeMovieYes }))
          .catch(next);
      } else {
        throw new ForbiddenError(errorMessages.removeMovie);
      }
    })
    .catch(next);
};
