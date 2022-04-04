var express = require('express');
var router = express.Router();
var csrf = require('csurf');
const bodyParser = require('body-parser');
// setup route middlewares
const { AdminUser } = require('./../../models/index');
const { adminAuthenticated } = require('./../../helpers/adminAuthHelper');
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
var passport = require('passport');
var authController = require('../../controller/adminController/authController');
router.use(passport.session());
var LocalStrategy = require('passport-local');






router.get('/',adminAuthenticated, function (req, res, next) {
    res.render('admin/dashboard')

});
// router.get('/register',  function(req,res){console.log(req.session.passport);return;}, csrfProtection, authController.get_register);
router.post('/', adminAuthenticated,parseForm, csrfProtection, authController.post_register);


//start auth

// end auth

module.exports = router;