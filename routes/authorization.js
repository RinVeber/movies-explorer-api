const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movie');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
