const moment = require('moment');

var express = require('express');
var router = express.Router();
const userController = require('./../../controller/apiController/userController');
const model = require('./../../models/index');
const modelHelper = require('../../helpers/modelHelpers');
const user = require('../../models/user');
const { User, UserGroup, GroupAccess } = require('./../../models/index');
var { eq, isnt } = require('handlebars-helpers')();
/* GET users listing. */


router.get('/chat', (req, res) => {
    res.render('test/chat');
});

router.get('/connect', (req, res) => {
    res.render('test/connect');
});

module.exports = router;