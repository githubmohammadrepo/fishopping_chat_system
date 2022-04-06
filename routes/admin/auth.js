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

passport.serializeUser(function (user, done) {
    user = (JSON.parse(JSON.stringify(user)))
    user = JSON.stringify(user)
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    user = JSON.parse(user);
    AdminUser.findOne({ where: { id: user.id } })
        .then(function (user) {
            done(null, user);
        }).catch(function (error) {
            done(error, null);
        })

});
var crypto = require('crypto');
passport.use(new LocalStrategy(
    function (username, password, done) {
        AdminUser.findOne({ where: { username: username } })
            .then(function (user) {
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            })
            .catch(function (error) {

                return done(error)

            })
    }
));



router.post('/login/password',
    passport.authenticate('local', { failureRedirect: '/admin/auth' }),
    function (req, res) {
        res.redirect('/admin/dashboard');
    });


router.get('/register', adminAuthenticated, csrfProtection, authController.get_register);
router.post('/register', adminAuthenticated,parseForm, csrfProtection, authController.post_register);
router.get('/', csrfProtection, authController.get_login);
router.post('/', csrfProtection, authController.post_login);


//start auth

// end auth

module.exports = router;