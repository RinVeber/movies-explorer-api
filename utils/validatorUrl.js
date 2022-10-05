const { CastError } = require('./errors/CastError');

function validatorUrl(url) {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/g;
  if (regex.test(url)) {
    return url;
  }
  throw new CastError('Невалидная ссылка');
}

module.exports = { validatorUrl };
