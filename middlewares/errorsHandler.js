const { errorMessages } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.kind === 'ObjectId') {
    res.status(400).send({
      message: errorMessages.correctInfo,
    });
  } else {
    res.status(statusCode).send({
      message: statusCode === 500 ? errorMessages.serverError : message,
    });
  }

  next();
};

module.exports = errorHandler;
