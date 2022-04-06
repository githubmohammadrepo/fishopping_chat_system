var express = require('express');
var router = express.Router();
var passport = require('passport'),
    OpenIDStrategy = require('passport-openid').Strategy;
var authController = require('./../../controller/apiController/authController');


router.post('/openid',
    passport.authenticate('openid'));

router.get('/openid/return',
    passport.authenticate('openid', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


module.exports = router;