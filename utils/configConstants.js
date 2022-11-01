const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'localhost:3002',
  'http://localhost:3000',
  'http://localhost:3002',
  'https://localhost:3000',
  'https://localhost:3002',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://project.movies.nomoredomains.icu',
  'https://api.project.movies.nomoredomains.icu',
  'http://project.movies.nomoredomains.icu',
  'http://api.project.movies.nomoredomains.icu',
  'project.movies.nomoredomains.icu',
  'api.project.movies.nomoredomains.icu',
];

const dataBase = 'mongodb://localhost:27017/moviesdb';

module.exports = { dataBase, allowedCors };
