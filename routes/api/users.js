var express = require('express');
var router = express.Router();
const userController = require('./../../controller/apiController/userController');

// show all users
router.get('/', userController.get_showAllUsers);

// show register user
router.get('/create', userController.get_createUser);

// post register user
router.post('/', userController.post_registerUser);

// show one user
router.get('/:id', userController.get_showOneUser);

// update user infos
router.put('/:id', userController.put_updateOneUser);

// delete user
router.delete('/:id', userController.delete_deleteOneUser);

module.exports = router;