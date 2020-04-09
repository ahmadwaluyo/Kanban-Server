const router = require('express').Router();
const TaskController = require('../controllers/TaskController');
const authentication = require('../middlewares/authentications');
const authorization = require('../middlewares/authorizations');

router.use(authentication);
router.get('/', TaskController.findAll);
router.post('/add', TaskController.create);
router.put('/update/:id', authorization, TaskController.update);
router.delete('/delete/:id', authorization, TaskController.delete);

module.exports = router;