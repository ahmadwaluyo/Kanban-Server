const router = require('express').Router();
const taskRoutes = require('./taskRoute');
const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.use('/task', taskRoutes);
router.use(errorHandler);

module.exports = router;