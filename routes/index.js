const router = require('express').Router();
const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/delete/:id', UserController.delete);
router.use(errorHandler);

module.exports = router;