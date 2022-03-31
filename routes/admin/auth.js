var express = require('express');
var router = express.Router();
var csrf = require('csurf')
const bodyParser = require('body-parser')
    // setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })


var passport = require('passport'),
    OpenIDStrategy = require('passport-openid').Strategy;
var authController = require('../../controller/adminController/authController');


router.get('/register', csrfProtection, authController.get_register);
router.post('/register', parseForm, csrfProtection, authController.post_register);
router.get('/', csrfProtection, authController.get_login);


module.exports = router;