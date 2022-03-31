var express = require('express');
var router = express.Router();
const userController = require('./../../controller/apiController/userController');
/* GET users listing. */
router.post('/create', userController.postUser);

module.exports = router;