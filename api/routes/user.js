const router = require('express').Router();
const UserController = require('../controllers/user');

router.get('/', UserController.getUsers);

router.post('/signup', UserController.signupUser);

router.post('/signin', UserController.siginUser);

router.get('/:id', UserController.getUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.removeUser);

module.exports = router;