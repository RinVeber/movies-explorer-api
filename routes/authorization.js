const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movie');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { errorMessages } = require('../utils/constants');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(errorMessages.noCorrectPuth));
});

module.exports = router;
