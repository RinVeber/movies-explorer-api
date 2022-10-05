const errorMessages = {
  createMovie: 'Введены некорректные данные',
  createConflictMovie: 'Такой фильм уде существует',
  notFoundMovie: 'Такой фильм не найден',
  removeMovie: 'Попытка удалить фильм другого пользователя',
  removeMovieYes: 'Фильм удален',
  notFoundUser: 'Пользователь не найден',
  createUser: 'Пользователь уже существует',
  updateUser: 'Такая почта уже существует',
  auth: 'Необходима авторизоваться',
};

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://project.movies.nomoredomains.icu',
  'https://api.project.movies.nomoredomains.icu',
];

module.exports = { errorMessages, allowedCors };
