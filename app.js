const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { errorMessages } = require('./utils/constants');

require('dotenv').config();

const { PORT = 3002, DATABASE = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();

const router = require('./routes/authorization');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorsHandler');
const limiter = require('./middlewares/limiter');

app.use(cors);

mongoose.connect(DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(errorMessages.crash);
  }, 0);
});

app.use(helmet());
app.use(limiter);
app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
