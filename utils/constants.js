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
  correctEmail: 'Неправильный формат почты',
  correctData: 'Неправильные почта или пароль',
  correctInfo: 'Некорректный формат данных',
  noCorrectPuth: 'Некорректный путь',
  errorValid: 'Ошибка валидации',
  serverError: 'На сервере произошла ошибка',
};

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = { errorMessages, DEFAULT_ALLOWED_METHODS };
